import React from 'react';

import styles from './GameMode.module.scss';

const GameMode = props => {

  return (
    <div className={[styles.GameMode, styles[props.gameMode.type]].join(' ')} onClick={props.gameModeWasSelected.bind(this, props.gameMode.id)}>
      <p>{props.gameMode.title}</p>
    </div>
  );
  
}

export default GameMode