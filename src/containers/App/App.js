import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';

import Header from '../../components/Header/Header';
import Game from '../Game/Game';

import styles from './App.module.scss';

const App = () => {

  const [startedState, startedtateSetter] = useState(false);
  const [playingState, playingStateSetter] = useState(false);

  const startButtonWasClickedHandler = () => {
    startedtateSetter(true);
  }

  const restartButtonWasClickedHandler = () => {
    startedtateSetter(false);
    playingStateSetter(false);
  }

  const gameModeWasSelectedHandler = () => {
    playingStateSetter(true);
  }

  return (
    <div className={styles.App}>
      <Header
        playing={startedState}
        startButtonWasClicked={startButtonWasClickedHandler}
        restartButtonWasClicked={restartButtonWasClickedHandler} />

      <CSSTransition
        in={startedState}
        unmountOnExit
        timeout={500}
        classNames={{
          enter: styles.gameWindowEnter,
          enterActive: styles.gameWindowEnterActive,
          exit: styles.gameWindowExit,
          exitActive: styles.gameWindowExitActive
        }}
      >

        <main className={styles.main}>
          <Game
            started={startedState}
            playing={playingState}
            gameModeWasSelected={gameModeWasSelectedHandler} />
        </main>
      </CSSTransition>
    </div>
  );
}

export default App;