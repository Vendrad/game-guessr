import React, { useState } from 'react';
import PropTypes from 'prop-types';

import GameModeSelector from '../../components/GameModeSelector/GameModeSelector';
import GameBoard from '../../components/GameBoard/GameBoard';

const Game = props => {

  const scoreDefaults = {
    score: 0,
    questions: 0,
    mistakes: 0
  };

  const [gameModeState, gameModeStateSetter] = useState(null);
  const [scoreState, scoreStateSetter] = useState(scoreDefaults);

  const gameModeWasSelectedHandler = gameMode => {
    props.gameModeWasSelected();
    gameModeStateSetter(gameMode);
    scoreStateSetter(scoreDefaults);
  };

  return (
    <>
      <GameModeSelector
        gameModeWasSelected={gameModeWasSelectedHandler.bind(this)}
        show={props.started && !props.playing} />
      <GameBoard
        show={props.started && props.playing}
        gameMode={gameModeState}
        score={scoreState} />
    </>
  );
};

Game.propTypes = {
  started: PropTypes.bool.isRequired,
  playing: PropTypes.bool.isRequired,
  scoreWasUpdated: PropTypes.func.isRequired,
  gameModeWasSelected: PropTypes.func.isRequired
}

export default Game;