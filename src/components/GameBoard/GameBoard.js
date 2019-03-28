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

import styles from './GameBoard.module.scss';

const GameBoard = props => {

  const [questionNumberState, questionNumberSetter] = useState(1);
  const [correctCountState, correctCountStateSetter] = useState(0);
  const [mistakeCountState, mistakeCountStateSetter] = useState(0);
  const [gameState, gameStateSetter] = useState(null);
  const [gameWindowInState, gameWindowInSetter] = useState(false);
  const [selectedGameIdState, selectedGameIdStateSetter] = useState(null);
  const [inputClearState, inputClearStateSetter] = useState(false);

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

  const gameWasSelectedHandler = (gameId) => {
    selectedGameIdStateSetter(gameId);
  };

  const answerWasSubmittedHandler = () => {

    if (selectedGameIdState !== gameState.id) {
      mistakeCountStateSetter(mistakeCountState + 1);
    } else {
      correctCountStateSetter(correctCountState + 1);
    }

    gameWindowInSetter(false);
    inputClearStateSetter(true);
    selectedGameIdStateSetter(null);
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
        gameWasSelected={gameWasSelectedHandler}
        inputClear={inputClearState}
        inputWasCleared={inputWasClearedHandler} />

      <GameSubmit
        disabled={selectedGameIdState === null ? true : false}
        answerWasSubmitted={answerWasSubmittedHandler} />
    </div>
  );
}

GameBoard.propTypes = {
  show: PropTypes.bool.isRequired,
  gameMode: PropTypes.instanceOf(Object),
  questionNumber: PropTypes.number
}

export default GameBoard;