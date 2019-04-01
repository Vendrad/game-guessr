import React, { useState } from 'react';
import PropTypes from 'prop-types';

import GameModeSelector from '../../components/GameModeSelector/GameModeSelector';
import GameBoard from '../../components/GameBoard/GameBoard';

const Game = props => {

  const [gameModeState, gameModeStateSetter] = useState(null);

  const gameModeWasSelectedHandler = gameMode => {
    gameModeStateSetter(gameMode);
    props.gameModeWasSelected();
  };

  return (
    <>
      <GameModeSelector
        gameModeWasSelected={gameModeWasSelectedHandler.bind(this)}
        show={!props.playing} />
      
      <GameBoard
        show={props.playing}
        gameMode={gameModeState} />
    </>
  );
};

Game.propTypes = {
  playing: PropTypes.bool.isRequired,
  gameModeWasSelected: PropTypes.func.isRequired
}

export default Game;