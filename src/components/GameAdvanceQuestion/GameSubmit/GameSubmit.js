import React from 'react';
import PropTypes from 'prop-types';

import styles from './GameSubmit.module.scss';

/**
 * Submit answer button
 *
 * Disabled when prop is set to true.
 * Fires the answerWasSubmitted callback when clicked.
 */
const GameSubmit = ({ disabled, answerWasSubmitted }) => {
  const attribute = disabled ? 'disabled' : null;
  return (
    <div className={styles.GameSubmit}>
      <button
        type="button"
        disabled={attribute}
        className={disabled ? styles.inactive : styles.active}
        onClick={answerWasSubmitted.bind(this, false)}
      >
        Submit
      </button>
    </div>
  );
};

GameSubmit.propTypes = {
  disabled: PropTypes.bool.isRequired,
  answerWasSubmitted: PropTypes.func.isRequired,
};

export default GameSubmit;
