import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { withRouter } from 'react-router-dom';

import Header from '../../components/Header/Header';
import Game from '../Game/Game';

import styles from './App.module.scss';

const App = ({location, history}) => {

  const [startedState, startedtateSetter] = useState(location.pathname !== '/');

  const startButtonWasClickedHandler = () => {
    startedtateSetter(true);
    history.push('/new-game');
  }

  const restartButtonWasClickedHandler = () => {
    startedtateSetter(false);
    history.push('/');
  }

  const gameModeWasSelectedHandler = (gameMode) => {
    history.push(`/game/${gameMode.slug}`);
  }

  return (
    <div className={styles.App}>
      <Header
        started={startedState}
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
            gameModeWasSelected={gameModeWasSelectedHandler} />
        </main>
      </CSSTransition>
    </div>
  );
}

export default withRouter(App);