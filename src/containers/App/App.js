import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { withRouter } from 'react-router-dom';

import Header from '../../components/Header/Header';
import Game from '../Game/Game';

import styles from './App.module.scss';

const App = props => {

  const [startedState, startedtateSetter] = useState(props.history.url !== '/');
  const [playingState, playingStateSetter] = useState(false);

  const startButtonWasClickedHandler = () => {
    startedtateSetter(true);
    props.history.push('/new-game');
  }

  const restartButtonWasClickedHandler = () => {
    startedtateSetter(false);
    playingStateSetter(false);
    props.history.push('/');
  }

  const gameModeWasSelectedHandler = (gameMode) => {
    playingStateSetter(true);
    props.history.push(`/game/${gameMode.slug}`);
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

export default withRouter(App);