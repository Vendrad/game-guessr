import React from 'react';
import PropTypes from 'prop-types';

import CorrectAnswer from './CorrectAnswer/CorrectAnswer';
import IncorrectAnswer from './IncorrectAnswer/IncorrectAnswer';

import styles from './GameAnswer.module.scss';
import Modal from '../UI/Modal/Modal';

const GameAnswer = (props) => {

  return (
    <Modal
      modalExitedCallback={props.answerWasDisplayed}
      styles={props.answer.wasCorrect ? styles.correct : styles.incorrect}>
      {props.answer.wasCorrect ?
        <CorrectAnswer /> :
        <IncorrectAnswer game={props.answer.correctGame} />
      }
    </Modal>
  )
};

GameAnswer.propTypes = {
  answer: PropTypes.instanceOf(Object).isRequired,
  answerWasDisplayed: PropTypes.func.isRequired
}

export default GameAnswer;