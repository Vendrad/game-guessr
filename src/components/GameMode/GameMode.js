import React from 'react';
import PropTypes from 'prop-types';

import styles from './GameMode.module.scss';

const GameMode = ({gameMode,gameModeWasSelected}) => {

  return (
    <div className={[styles.GameMode, styles[gameMode.type]].join(' ')} onClick={gameModeWasSelected.bind(this, gameMode.id)}>
      <p>{gameMode.title}</p>
    </div>
  );
  
}

GameMode.propTypes = {
  gameMode: PropTypes.instanceOf(Object),
  gameModeWasSelected: PropTypes.func
}

export default GameMode