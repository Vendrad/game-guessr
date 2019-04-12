import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import GameModeSelector from '../GameModeSelector/GameModeSelector';
import GameBoardDefault from '../GameBoard/GameBoard';

const Game = ({ gameModeWasSelected }) => (
  <>
    <Route
      path="/new-game"
      exact
      component={() => (
        <GameModeSelector gameModeWasSelected={gameModeWasSelected} />
      )}
    />

    <Route path="/game/:slug" exact component={() => <GameBoardDefault />} />
  </>
);

Game.propTypes = {
  gameModeWasSelected: PropTypes.func.isRequired,
};

export default Game;
