import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Axios from 'axios';
import { CSSTransition } from 'react-transition-group';
import { randBetweenInclusive } from '../../helpers';
import { cleanGameResponse } from '../../igdb';

import GameHeader from './GameHeader/GameHeader';
import GameQuestion from './GameQuestion/GameQuestion.js';
import GameInput from './GameInput/GameInput';
import GameSubmit from './GameSubmit/GameSubmit';
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
    if (props.gameMode === undefined || props.gameMode === null) return undefined;

    const [startDate, endDate] = getDates(props.gameMode);
    const offset = randBetweenInclusive(0, 134);

    Axios.post('release_dates', 'fields id,game.name,game.alternative_names.name,game.storyline,y;where y >= ' + startDate + ' & y <= ' + endDate + ' & game.storyline != null & game.category = 0;limit 1;offset ' + offset + ';')
      .then(response => {
        gameStateSetter(cleanGameResponse(response.data[0]));
        gameWindowInSetter(true);
      });
  }, [questionNumberState, props.gameMode]);

  const getDates = gameMode => {
    const rand = randBetweenInclusive(gameMode.minYear, gameMode.maxYear - 4)
    return [rand, rand + 4];
  };

  const inputWasChangedHandler = (input) => {
    inputStateSetter(input);
  };

  const gameWasSelectedHandler = (game) => {
    console.log(game);
    selectedGameStateSetter(game);
  };

  const answerWasSubmittedHandler = () => {

    const answer = {};

    answer.wasCorrect = answerWasCorrect();
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
  }

  const feedNewQuestion = () => {
    questionNumberSetter(questionNumberState + 1);
  }

  let wrappedClasses = [styles.GameBoard, styles.closed];
  if (props.show) wrappedClasses = [styles.GameBoard, styles.open];

  return (
    <div className={wrappedClasses.join(' ')}>
      <GameHeader
        correctCount={correctCountState}
        mistakeCount={mistakeCountState} />

      <CSSTransition
        in={gameWindowInState}
        unmountOnExit
        timeout={50}
        classNames={{
          enter: styles.gameWindowEnter,
          enterDone: styles.gameWindowEnterDone,
          exit: styles.gameWindowExit,
          exitDone: styles.gameWindowExitDone
        }}
        onExited={feedNewQuestion}
      >
        <GameQuestion game={gameState} />
      </CSSTransition>

      <GameInput
        inputWasChanged={inputWasChangedHandler}
        gameWasSelected={gameWasSelectedHandler}
        inputClear={inputClearState}
        inputWasCleared={inputWasClearedHandler} />

      <GameSubmit
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
  gameMode: PropTypes.instanceOf(Object),
  questionNumber: PropTypes.number
}

export default GameBoard;