import React from 'react';
import PropTypes from 'prop-types';

import CorrectAnswer from './CorrectAnswer/CorrectAnswer';
import IncorrectAnswer from './IncorrectAnswer/IncorrectAnswer';

import styles from './GameAnswer.module.scss';
import Modal from '../UI/Modal/Modal';

/**
 * General wrapper to select between showing Correct/Incorrect answer
 * components when giving the user feedback. Feedback wrapped in a Modal.
 */
const GameAnswer = ({answer, answerWasDisplayed}) => {

  return (
    <Modal
      modalExitedCallback={answerWasDisplayed}
      extraStyles={answer.wasCorrect ? styles.correct : styles.incorrect}>
      {answer.wasCorrect ?
        <CorrectAnswer /> :
        <IncorrectAnswer game={answer.correctGame} />
      }
    </Modal>
  )
};

GameAnswer.propTypes = {
  answer: PropTypes.instanceOf(Object).isRequired,
  answerWasDisplayed: PropTypes.func.isRequired
}

export default GameAnswer;