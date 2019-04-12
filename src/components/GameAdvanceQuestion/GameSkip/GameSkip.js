import React from 'react';
import PropTypes from 'prop-types';

import styles from './GameSkip.module.scss';

/**
 * Skip question button
 *
 * OnClick fires answer submitted callback with skip flag set to true
 *
 * @param {object} props
 */
const GameSkip = ({ answerWasSubmitted }) => (
  <div className={styles.GameSkip}>
    <button type="button" onClick={answerWasSubmitted.bind(this, true)}>Skip</button>
  </div>
);

GameSkip.propTypes = {
  answerWasSubmitted: PropTypes.func.isRequired,
};

export default GameSkip;
