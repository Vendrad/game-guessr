import React from 'react';
import PropTypes from 'prop-types';

import GameSkip from './GameSkip/GameSkip';
import GameSubmit from './GameSubmit/GameSubmit';

import styles from './GameAdvanceQuestion.module.scss';

/**
 * General wrapper for the components to advance to the next question
 */
const GameAdvanceQuestion = ({disabled, answerWasSubmitted}) => {
  return (
    <div className={styles.GameAdvanceQuestion}>
      <GameSkip
        answerWasSubmitted={answerWasSubmitted} />
      <GameSubmit
        disabled={disabled}
        answerWasSubmitted={answerWasSubmitted} />
    </div>
  )
};

GameAdvanceQuestion.propTypes = {
  disabled: PropTypes.bool.isRequired,
  answerWasSubmitted: PropTypes.func.isRequired
}

export default GameAdvanceQuestion;