import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import GameModeSelector from '../GameModeSelector/GameModeSelector';
import GameBoard from '../GameBoard/GameBoard';

const Game = props => {

  return (
    <>
      <Route path="/new-game" exact component={() => (
        <GameModeSelector
          gameModeWasSelected={props.gameModeWasSelected.bind(this)}
          show={!props.playing} />
      )} />
      
      <Route path="/game/:slug" exact component={() => (
        <GameBoard
          show={props.playing} />
      )} />
      
    </>
  );
};

Game.propTypes = {
  playing: PropTypes.bool.isRequired,
  gameModeWasSelected: PropTypes.func.isRequired
}

export default Game;