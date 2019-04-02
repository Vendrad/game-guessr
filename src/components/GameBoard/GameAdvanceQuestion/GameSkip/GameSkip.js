import React from 'react';
import PropTypes from 'prop-types';

import styles from './GameSkip.module.scss';

const GameSkip = props => {
  return (
    <div className={styles.GameSkip}>
      <button onClick={props.answerWasSubmitted.bind(this, true)}>Skip</button>
    </div>
  )
};

GameSkip.propTypes = {
  answerWasSubmitted: PropTypes.func.isRequired
}

export default GameSkip;