import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';
import { withRouter } from 'react-router-dom';
import { PropTypes } from 'prop-types';

import Header from '../../components/Header/Header';
import Game from '../Game/Game';

import styles from './App.module.scss';

/**
 * Top level component to render the app
 *
 * Stores general state of the app and
 * handles starting and restarting new games
 */
export class App extends Component {
  /**
   * If the user is not entering the App at the root
   * this ensures we make sure the App is set as started
   */
  constructor(props) {
    super(props);

    const { location } = this.props;

    this.state = {
      started: location.pathname !== '/',
    };
  }

  /**
   * Ensures that the App is set as not started if the user ever
   * lands at the root when the App was previously set as started
   */
  componentDidUpdate() {
    const { location } = this.props;
    const { started } = this.state;

    started === true
      && location.pathname === '/'
      // Deemed safe as this is being checked for above
      // eslint-disable-next-line react/no-did-update-set-state
      && this.setState({ started: false });
  }

  /**
   * Handler for starting the App and opening up the new-game page
   */
  startButtonWasClickedHandler = () => {
    const { history } = this.props;
    this.setState({ started: true });
    history.push('/new-game');
  };

  /**
   * Pushes the user back to the root page
   */
  restartButtonWasClickedHandler = () => {
    const { history } = this.props;
    this.setState({ started: false });
    history.push('/');
  };

  /**
   * Pushes the user to start playing a specific gameMode
   */
  gameModeWasSelectedHandler = (gameMode) => {
    const { history } = this.props;
    history.push(`/game/${gameMode.slug}`);
  };

  render() {
    const { started } = this.state;
    return (
      <div className={styles.App}>
        <Header
          started={started}
          startButtonWasClicked={this.startButtonWasClickedHandler}
          restartButtonWasClicked={this.restartButtonWasClickedHandler}
        />

        <CSSTransition
          in={started}
          unmountOnExit
          timeout={500}
          classNames={{
            enter: styles.gameWindowEnter,
            enterActive: styles.gameWindowEnterActive,
            exit: styles.gameWindowExit,
            exitActive: styles.gameWindowExitActive,
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

App.propTypes = {
  location: PropTypes.instanceOf(Object).isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
};

export default withRouter(App);
