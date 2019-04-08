import React from 'react';
import PropTypes from 'prop-types';

import GameMode from '../../components/GameMode/GameMode';
import gameModes from '../../core/gameModes/gameModes';

import styles from './GameModeSelector.module.scss';

const GameModeSelector = props => {

  const gameModeWasSelectedHandler = (gameModeId) => {
    const [gameMode] = gameModes.filter((gameMode) => { return gameMode.id === gameModeId } );
    props.gameModeWasSelected(gameMode);
  }
 
  return (
    <div className={styles.GameModeSelector}>
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