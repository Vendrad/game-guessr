import React from 'react';
import PropTypes from 'prop-types';

import styles from './GameSubmit.module.scss';

const GameSubmit = props => {
  const attribute = props.disabled ? 'disabled' : null;
  return (
    <div className={styles.GameSubmit}>
      <button disabled={attribute} className={props.disabled ? styles.inactive : styles.active} onClick={props.answerWasSubmitted.bind(this, false)}>Submit</button>
    </div>
  )
};

GameSubmit.propTypes = {
  disabled: PropTypes.bool.isRequired,
  answerWasSubmitted: PropTypes.func.isRequired
}

export default GameSubmit;