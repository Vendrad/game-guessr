import React, { useState } from 'react';

import Header from '../../components/Header/Header';
import Game from '../Game/Game';

import styles from './App.module.scss';

const App = () => {

  const [scoreState, scoreStateSetter] = useState(0);
  const [startedState, startedtateSetter] = useState(false);
  const [playingState, playingStateSetter] = useState(false);

  const scoreWasUpdatedHandler = (score) => {
    scoreStateSetter(scoreState + score);
  }

  const startButtonWasClickedHandler = () => {
    startedtateSetter(true);
  }

  const restartButtonWasClickedHandler = () => {
    scoreStateSetter(0);
    startedtateSetter(false);
    playingStateSetter(false);
  }

  const gameModeWasSelectedHandler = () => {
    playingStateSetter(true);
  }

  let classesMain = [styles.main, styles.closed];
  if (startedState) classesMain = [styles.main, styles.open];

  return (
    <div className={styles.App}>
      <Header
        score={scoreState}
        playing={startedState}
        startButtonWasClicked={startButtonWasClickedHandler}
        restartButtonWasClicked={restartButtonWasClickedHandler} />
      <main className={classesMain.join(' ')}>
        <Game
          started={startedState}
          playing={playingState}
          scoreWasUpdated={scoreWasUpdatedHandler}
          gameModeWasSelected={gameModeWasSelectedHandler} />
      </main>
    </div>
  );
}

export default App;


/*

  gameBeginHandler(minYear, maxYear) {
    const gameDatabase = new GameDatabase();

    // Execute game
    // Reset score and counters
    // Pull Game
    // Setup boardd
    console.log(gameDatabase.getRandom(minYear, maxYear));
  }
  */