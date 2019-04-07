import React from 'react';
import PropTypes from 'prop-types';

import GameMode from './GameMode/GameMode';

import styles from './GameModeSelector.module.scss';

const GameModeSelector = props => {

  const gameModes = [
    {id: 0, type: 'normal', title: '80\'s'},
    {id: 1, type: 'normal', title: '90\'s'},
    {id: 2, type: 'normal', title: '00\'s'},
    {id: 3, type: 'normal', title: '10\'s'},
    {id: 4, type: 'all', title: 'I can handle anything!'}
  ];

  const gameModeWasSelectedHandler = (gameModeId) => {
    const [gameMode] = gameModes.filter((gameMode) => { return gameMode.id === gameModeId } );
    props.gameModeWasSelected(gameMode);
  }

  let classes = [styles.GameModeSelector, styles.closed]
  if (props.show) classes = [styles.GameModeSelector, styles.open];
 
  return (
    <div className={classes.join(' ')}>
      <p className={styles.GameModeSelectorHeader}>Choose your decade!</p>
      {gameModes.map((gameMode) => {
        return <GameMode
          key={gameMode.id}
          gameMode={gameMode}
          gameModeWasSelected={gameModeWasSelectedHandler.bind(this)} />;
      })}
    </div>
  );

};

GameModeSelector.propTypes = {
  show: PropTypes.bool.isRequired,
  gameModeWasSelected: PropTypes.func.isRequired
}

export default GameModeSelector;