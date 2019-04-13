import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import styles from './GameOver.module.scss';
import Modal from '../UI/Modal/Modal';

import GameQuip from './GameQuip/GameQuip';

/**
 * Renders a modal that displays the result of a players game
 */
export const GameOver = ({ history, correctCount }) => {
  /**
   * Handles pushing a player to the new game page if they
   * choose to restart
   */
  const playAgainButtonWasClickedHandler = () => {
    history.push('/new-game');
  };

  return (
    <Modal automaticallyExit={false} extraStyles={styles.GameOverModal}>
      <p className={styles.FinalScore}>
        {'You scored: '}
        {correctCount}
      </p>
      <GameQuip correctCount={correctCount} />
      <p className={styles.Plug}>
        {'Head over to '}
        <a href="https://igdb.com">igdb.com</a>
        {' to discover more games!'}
      </p>
      <button
        type="button"
        className={styles.PlayAgainButton}
        onClick={playAgainButtonWasClickedHandler}
      >
        Play Again
      </button>
    </Modal>
  );
};

GameOver.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
  correctCount: PropTypes.number.isRequired,
};

export default withRouter(GameOver);
