import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Axios from 'axios';
import { CSSTransition } from 'react-transition-group';

import { slugToApiSlug } from '../../core/gameModes/gameModes';
import { cleanGameResponse } from '../../core/gameManipulators';
import AppConfig from '../../config/App.config';

import GameHeader from './GameHeader/GameHeader';
import GameQuestion from './GameQuestion/GameQuestion.js';
import GameInput from './GameInput/GameInput';
import GameAdvanceQuestion from './GameAdvanceQuestion/GameAdvanceQuestion';
import GameAnswer from './GameAnswer/GameAnswer';

import styles from './GameBoard.module.scss';

const GameBoard = props => {

  const [questionNumberState, questionNumberSetter] = useState(1);
  const [correctCountState, correctCountStateSetter] = useState(0);
  const [mistakeCountState, mistakeCountStateSetter] = useState(0);

  const [gameState, gameStateSetter] = useState(null);
  const [gameWindowInState, gameWindowInSetter] = useState(false);
  
  const [inputState, inputStateSetter] = useState("");
  const [selectedGameState, selectedGameStateSetter] = useState(null);
  const [inputClearState, inputClearStateSetter] = useState(false);
  const [answerState, answerStateSetter] = useState(null);

  useEffect(() => {
    const apiUrl = 'games/random/' + slugToApiSlug(props.match.params.slug); 

    Axios.get(apiUrl)
      .then(response => {
        gameStateSetter(cleanGameResponse(response.data));
        gameWindowInSetter(true);
      });
  }, [questionNumberState]);

  const inputWasChangedHandler = (input) => {
    inputStateSetter(input);
  };

  const gameWasSelectedHandler = (game) => {
    selectedGameStateSetter(game);
  };

  const answerWasSubmittedHandler = skip => {

    const answer = {};

    answer.wasCorrect = skip ? false : answerWasCorrect();
    answer.correctGame = gameState;

    if (answer.wasCorrect) {
      correctCountStateSetter(correctCountState + 1);
    } else {
      mistakeCountStateSetter(mistakeCountState + 1);
    }

    answerStateSetter(answer);
    gameWindowInSetter(false);
    inputClearStateSetter(true);
    selectedGameStateSetter(null);
  }

  const answerWasCorrect = () => {

    if (selectedGameState !== null) {
      console.log(selectedGameState);
      if (selectedGameState.id === gameState.id) return true;
      if (selectedGameState.name.toLowerCase() === gameState.name.toLowerCase()) return true;
    }

    return inputState.toLowerCase() === gameState.name.toLowerCase();
  }

  const answerWasDisplayedHandler = () => {
    answerStateSetter(null);
  }

  const inputWasClearedHandler = () => {
    inputClearStateSetter(false);
    inputStateSetter("");
  }

  const feedNewQuestion = () => {
    questionNumberSetter(questionNumberState + 1);
  }

  if (mistakeCountState >= AppConfig.lives) {
    alert('You lose!');
  }

  return (
    <div className={styles.GameBoard}>
      <GameHeader
        correctCount={correctCountState}
        correctCountFlyaway={answerState !== null ? answerState.wasCorrect : false}
        mistakeCount={mistakeCountState} />

      <div className={styles.GameQuestionArea}>      
        <CSSTransition
          in={gameWindowInState}
          unmountOnExit
          timeout={1000}
          classNames={{
            enter: styles.gameQuestionWindowEnter,
            enterActive: styles.gameQuestionWindowEnterActive,
            exit: styles.gameQuestionWindowExit,
            exitActive: styles.gameQuestionWindowExitActive
          }}
          onExited={feedNewQuestion}
        >
          <GameQuestion game={gameState} />
        </CSSTransition>
      </div>

      <GameInput
        inputWasChanged={inputWasChangedHandler}
        gameWasSelected={gameWasSelectedHandler}
        inputClear={inputClearState}
        inputWasCleared={inputWasClearedHandler}
        answerWasSubmitted={answerWasSubmittedHandler} />

      <GameAdvanceQuestion
        disabled={selectedGameState !== null || inputState.length > 0 ? false : true}
        answerWasSubmitted={answerWasSubmittedHandler} />

      {answerState !== null
        ? <GameAnswer answer={answerState}
          answerWasDisplayed={answerWasDisplayedHandler} />
        : null }
    </div>
  );
}

GameBoard.propTypes = {
  show: PropTypes.bool.isRequired,
  questionNumber: PropTypes.number
}

export default withRouter(GameBoard);