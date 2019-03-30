import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';

import CorrectAnswer from './CorrectAnswer/CorrectAnswer';
import IncorrectAnswer from './IncorrectAnswer/IncorrectAnswer';

import styles from './GameAnswer.module.scss';

const GameAnswer = (props) => {

  const [inState, inStateSetter] = useState(false);

  useEffect(() => {
    inStateSetter(true);
  },[]);

  const answerEntered = () => {
    inStateSetter(false);
  };

  return (
    <CSSTransition
      in={inState}
      timeout={{
        appear: 0,
        enter: 2000,
        exit: 500,
       }}
      unmountOnExit
      onEntered={answerEntered}
      onExited={props.answerWasDisplayed}
      classNames={{
        enter: styles.answerEnter,
        enterActive: styles.answerEnterActive,
        exit: styles.answerExit,
        exitActive: styles.answerExitActive
      }}
      >
      <div className={styles.GameAnswer}>
        {props.answer.wasCorrect ?
          <CorrectAnswer /> :
          <IncorrectAnswer game={props.answer.correctGame} />
        }
      </div>
    </CSSTransition>
  )
};

GameAnswer.propTypes = {
  answer: PropTypes.instanceOf(Object).isRequired,
  answerWasDisplayed: PropTypes.func.isRequired
}

export default GameAnswer;