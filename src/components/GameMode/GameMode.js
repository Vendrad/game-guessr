import React from 'react';
import PropTypes from 'prop-types';

import styles from './GameMode.module.scss';

const GameMode = ({ gameMode, gameModeWasSelected }) => (
  <button
    type="button"
    className={[styles.GameMode, styles[gameMode.type]].join(' ')}
    onClick={gameModeWasSelected.bind(this, gameMode.id)}
  >
    <p>{gameMode.title}</p>
  </button>
);

GameMode.propTypes = {
  gameMode: PropTypes.instanceOf(Object).isRequired,
  gameModeWasSelected: PropTypes.func.isRequired,
};

export default GameMode;
