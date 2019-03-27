import React from 'react';
import PropTypes from 'prop-types';

import GameMode from './GameMode/GameMode';

import styles from './GameModeSelector.module.scss';

const GameModeSelector = props => {

  const gameModes = [
    {id: 0, type: 'normal', title: '80\'s', minYear: 1980, maxYear: 1989},
    {id: 1, type: 'normal', title: '90\'s', minYear: 1990, maxYear: 1999},
    {id: 2, type: 'normal', title: '00\'s', minYear: 2000, maxYear: 2009},
    {id: 3, type: 'normal', title: '10\'s', minYear: 2010, maxYear: 2019},
    {id: 4, type: 'all', title: 'I can handle anything!', minYear: 1980, maxYear: 2019}
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