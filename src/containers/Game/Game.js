import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import GameModeSelector from '../GameModeSelector/GameModeSelector';
import GameBoard from '../GameBoard/GameBoard';

export const Game = ({gameModeWasSelected}) => {

  return (
    <>
      <Route path="/new-game" exact component={() => (
        <GameModeSelector
          gameModeWasSelected={gameModeWasSelected.bind(this)} />
      )} />
      
      <Route path="/game/:slug" exact component={() => <GameBoard />} />
      
    </>
  );
};

Game.propTypes = {
  gameModeWasSelected: PropTypes.func.isRequired
}

export default Game;