import React from 'react';
import PropTypes from 'prop-types';

import GameMode from '../../components/GameMode/GameMode';
import gameModes from '../../core/gameModes/gameModes';

import styles from './GameModeSelector.module.scss';

/**
 * Game mode selection page
 *
 * Renders each game mode on a single page so
 * the player can choose how they wish to proceed.
 */
const GameModeSelector = ({ gameModeWasSelected }) => (
  <div className={styles.GameModeSelector}>
    <p className={styles.GameModeSelectorHeader}>Choose your decade!</p>
    {gameModes().map(gameMode => (
      <GameMode
        key={gameMode.id}
        gameMode={gameMode}
        gameModeWasSelected={gameModeWasSelected}
      />
    ))}
  </div>
);

GameModeSelector.propTypes = {
  gameModeWasSelected: PropTypes.func.isRequired,
};

export default GameModeSelector;
