import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Axios from 'axios';
import { CSSTransition } from 'react-transition-group';
import { PropTypes } from 'prop-types';

import { slugToApiSlug } from '../../core/gameModes/gameModes';
import { cleanGameResponse } from '../../core/gameManipulators/cleanGameResponse';
import AppConfig from '../../config/App.config';

import GameHeader from '../../components/GameHeader/GameHeader';
import GameQuestion from '../../components/GameQuestion/GameQuestion';
import GameInput from '../../components/GameInput/GameInput';
import GameAdvanceQuestion from '../../components/GameAdvanceQuestion/GameAdvanceQuestion';
import GameAnswer from '../../components/GameAnswer/GameAnswer';
import GameOverDefault from '../../components/GameOver/GameOver';

import styles from './GameBoard.module.scss';

export class GameBoard extends Component {
  static answerIsCorrect(selectedGame, game, input) {
    if (selectedGame !== null) {
      if (selectedGame.id === game.id) return true;
      if (selectedGame.name.toLowerCase() === game.name.toLowerCase()) return true;
    }

    return input.toLowerCase() === game.name.toLowerCase();
  }

  state = {
    questionNumber: 1,
    correctCount: 0,
    mistakeCount: 0,
    displayGameOverModal: false,
    gameWindowIn: false,
    game: null,
    answer: null,
    input: '',
    inputShouldBeCleared: false,
    selectedGame: null,
  };

  componentDidMount() {
    this.getQuestion();
  }

  componentDidUpdate(prevProps, prevState) {
    const { questionNumber } = this.state;

    questionNumber !== prevState.questionNumber && this.getQuestion();
  }

  getQuestion() {
    const { match } = this.props;

    const apiUrl = `games/random/${slugToApiSlug(match.params.slug)}`;

    this.handleGetQuestionRequest(apiUrl);
  }

  feedNewQuestion = () => {
    const { questionNumber } = this.state;
    this.setState({ questionNumber: questionNumber + 1 });
  };

  inputWasChangedHandler = (input) => {
    this.setState({ input });
  };

  inputWasClearedHandler = () => {
    this.setState({ inputShouldBeCleared: false, input: '' });
  };

  gameWasSelectedHandler = (game) => {
    this.setState({ selectedGame: game });
  };

  answerWasDisplayedHandler = () => {
    this.setState({ answer: null });
  };

  answerWasSubmittedHandler = (skip) => {
    const {
      correctCount,
      mistakeCount,
      selectedGame,
      game,
      input,
    } = this.state;

    if (game === null) return;

    const answer = {};
    const state = {};

    answer.wasCorrect = !skip && this.constructor.answerIsCorrect(selectedGame, game, input);
    answer.correctGame = game;

    if (answer.wasCorrect) {
      state.correctCount = correctCount + 1;
    } else {
      state.mistakeCount = mistakeCount + 1;
    }

    if (mistakeCount + 1 >= AppConfig().lives) {
      state.displayGameOverModal = true;
      this.setState(state);
      return;
    }

    state.answer = answer;
    state.gameWindowIn = false;
    state.inputShouldBeCleared = true;
    state.selectedGame = null;

    this.setState(state);
  };

  handleGetQuestionRequest(url) {
    Axios.get(url).then((response) => {
      this.handleGetQuestionResponse(response.data);
    });
  }

  handleGetQuestionResponse(response) {
    this.setState({
      game: cleanGameResponse(response),
      gameWindowIn: true,
    });
  }

  render() {
    const {
      correctCount,
      mistakeCount,
      answer,
      gameWindowIn,
      game,
      inputShouldBeCleared,
      input,
      selectedGame,
      displayGameOverModal,
    } = this.state;

    return (
      <div className={styles.GameBoard}>
        <GameHeader
          correctCount={correctCount}
          correctCountFlyaway={answer && answer.wasCorrect}
          mistakeCount={mistakeCount}
        />

        <div className={styles.GameQuestionArea}>
          <CSSTransition
            in={gameWindowIn}
            unmountOnExit
            timeout={1000}
            classNames={{
              enter: styles.gameQuestionWindowEnter,
              enterActive: styles.gameQuestionWindowEnterActive,
              exit: styles.gameQuestionWindowExit,
              exitActive: styles.gameQuestionWindowExitActive,
            }}
            onExited={this.feedNewQuestion}
          >
            <GameQuestion game={game} />
          </CSSTransition>
        </div>

        <GameInput
          inputWasChanged={this.inputWasChangedHandler}
          gameWasSelected={this.gameWasSelectedHandler}
          inputWasCleared={this.inputWasClearedHandler}
          answerWasSubmitted={this.answerWasSubmittedHandler}
          inputShouldBeCleared={inputShouldBeCleared}
        />

        <GameAdvanceQuestion
          disabled={selectedGame === null && input.length === 0}
          answerWasSubmitted={this.answerWasSubmittedHandler}
        />

        {answer !== null && (
          <GameAnswer
            answer={answer}
            answerWasDisplayed={this.answerWasDisplayedHandler}
          />
        )}

        {displayGameOverModal && (
          <GameOverDefault correctCount={correctCount} />
        )}
      </div>
    );
  }
}

GameBoard.propTypes = {
  match: PropTypes.instanceOf(Object).isRequired,
};

export default withRouter(GameBoard);
