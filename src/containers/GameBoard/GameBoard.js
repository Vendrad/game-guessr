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

/**
 * Main component for handling a game session
 */
export class GameBoard extends Component {
  state = {
    /**
     * The number of questions the user has got correct
     */
    correctCount: 0,

    /**
     * The number of questions the user has got incorrect
     */
    mistakeCount: 0,

    /**
     * Whether or not the GameOver modal should be rendered
     */
    displayGameOverModal: false,

    /**
     * Controller for CSSTransition animation of the question component
     */
    questionWindowIn: false,

    /**
     * The game object for the current question
     */
    game: null,

    /**
     * The current answer submitted by the user
     */
    answer: null,

    /**
     * The text in the input field
     */
    input: '',

    /**
     * Whether or not the input field should be cleared
     */
    inputShouldBeCleared: false,

    /**
     * The game selected in the autocomplete list
     */
    selectedGame: null,
  };

  /**
   * Fetch a new question when the component mounts
   */
  componentDidMount() {
    this.fetchNewQuestion();
  }

  /**
   * When the input changes set it to state
   *
   * @param {string} input
   */
  inputWasChangedHandler = (input) => {
    this.setState({ input });
  };

  /**
   * Callback for when the input was cleared
   * so that we don't try to clear it again
   */
  inputWasClearedHandler = () => {
    this.setState({ inputShouldBeCleared: false, input: '' });
  };

  /**
   * Set the game into state when it is
   * selected in the autocomplete list
   *
   * @param {Object} game
   */
  gameWasSelectedHandler = (game) => {
    this.setState({ selectedGame: game });
  };

  /**
   * When the answer result modal has finished
   * displaying clear out the users last answer
   */
  answerWasDisplayedHandler = () => {
    this.setState({ answer: null });
  };

  /**
   * When the answer is submitted handle score updates
   *
   * @param {bool} skip if true, answer was flagged as
   *  being skipped which forces an incorrect answer event.
   */
  answerWasSubmittedHandler = (skip) => {
    const {
      correctCount,
      mistakeCount,
      selectedGame,
      game,
      input,
    } = this.state;

    // Block the submit if a game has not been set yet
    if (game === null) return;

    const answer = {};
    const state = {};

    // If the answer was not skipped and is true mark as correct
    answer.wasCorrect = !skip && this.answerIsCorrect(selectedGame, game, input);
    answer.correctGame = game;

    /**
     * If the answer was correct increment the
     * correct count else increment the mistake count
     */
    if (answer.wasCorrect) {
      state.correctCount = correctCount + 1;
    } else {
      state.mistakeCount = mistakeCount + 1;
    }

    // If the mistakes equals or exceeds lives, display GameOver
    if (mistakeCount + 1 >= AppConfig().lives) {
      state.displayGameOverModal = true;
      this.setState(state);
      return;
    }

    // Set the current answer in state, clear out everything else
    state.answer = answer;
    state.questionWindowIn = false;
    state.inputShouldBeCleared = true;
    state.selectedGame = null;

    this.setState(state);
  };

  /**
   * Starts chain to fetch a random game from the API
   * with the given game mode as set in the current URL
   *
   * This loads the game as a question to the player
   */
  fetchNewQuestion = () => {
    const { match } = this.props;

    const apiUrl = `games/random/${slugToApiSlug(match.params.slug)}`;

    this.handlefetchNewQuestionRequest(apiUrl);
  };

  /**
   * Makes the Axios request and stipualtes the response handler
   */
  handlefetchNewQuestionRequest = (url) => {
    Axios.get(url).then((response) => {
      this.handlefetchNewQuestionResponse(response.data);
    });
  };

  /**
   * Sets the API response object into state and triggers
   * the variable that will feed the new question into view
   */
  handlefetchNewQuestionResponse = (response) => {
    this.setState({
      game: cleanGameResponse(response),
      questionWindowIn: true,
    });
  };

  /**
   * Logic for determining whether the players answer was correct
   */
  answerIsCorrect = (selectedGame, game, input) => {
    // If there is a selected game, check id or name matches
    if (selectedGame !== null) {
      if (selectedGame.id === game.id) return true;
      if (selectedGame.name.toLowerCase() === game.name.toLowerCase()) return true;
    }

    // Check if the raw input matches
    return input.toLowerCase() === game.name.toLowerCase();
  };

  render() {
    const {
      correctCount,
      mistakeCount,
      answer,
      questionWindowIn,
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
            in={questionWindowIn}
            unmountOnExit
            timeout={1000}
            classNames={{
              enter: styles.gameQuestionWindowEnter,
              enterActive: styles.gameQuestionWindowEnterActive,
              exit: styles.gameQuestionWindowExit,
              exitActive: styles.gameQuestionWindowExitActive,
            }}
            onExited={this.fetchNewQuestion}
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
