import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';
import { withRouter } from 'react-router-dom';

import Header from '../../components/Header/Header';
import Game from '../Game/Game';

import styles from './App.module.scss';

export class App extends Component {

  constructor(props) {
    super(props);

    const { location } = this.props;

    this.state = {
      started: location.pathname !== '/'
    }
  }

  componentDidUpdate() {
    const { location } = this.props;

    this.state.started === true
      && location.pathname === '/'
      && this.setState({started: false});
  }

  startButtonWasClickedHandler = () => {
    const { history } = this.props;
    this.setState({started: true});
    history.push('/new-game');
  }

  restartButtonWasClickedHandler = () => {
    const { history } = this.props;
    this.setState({started: false});
    history.push('/');
  }

  gameModeWasSelectedHandler = (gameMode) => {
    const { history } = this.props;
    history.push(`/game/${gameMode.slug}`);
  }

  render () {
    return (
      <div className={styles.App}>
        <Header
          started={this.state.started}
          startButtonWasClicked={this.startButtonWasClickedHandler}
          restartButtonWasClicked={this.restartButtonWasClickedHandler} />

        <CSSTransition
          in={this.state.started}
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
            <Game gameModeWasSelected={this.gameModeWasSelectedHandler} />
          </main>
        </CSSTransition>
      </div>
    );
  }
}

export default withRouter(App);