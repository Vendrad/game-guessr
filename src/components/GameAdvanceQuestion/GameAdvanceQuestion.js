import React from 'react';
import PropTypes from 'prop-types';

import GameSkip from './GameSkip/GameSkip';
import GameSubmit from './GameSubmit/GameSubmit';

import styles from './GameAdvanceQuestion.module.scss';

const GameAdvanceQuestion = props => {
  return (
    <div className={styles.GameAdvanceQuestion}>
      <GameSkip
        answerWasSubmitted={props.answerWasSubmitted} />
      <GameSubmit
        disabled={props.disabled}
        answerWasSubmitted={props.answerWasSubmitted} />
    </div>
  )
};

GameAdvanceQuestion.propTypes = {
  disabled: PropTypes.bool.isRequired,
  answerWasSubmitted: PropTypes.func.isRequired
}

export default GameAdvanceQuestion;