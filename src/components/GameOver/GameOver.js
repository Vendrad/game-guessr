import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import styles from './GameOver.module.scss';
import Modal from '../UI/Modal/Modal';

import GameQuip from './GameQuip/GameQuip';

const GameOver = ({history, correctCount, answerWasDisplayed}) => {

  const playAgainButtonWasClickedHandler = () => {
    history.push('/new-game');
  };

  return (
    <Modal
      modalExitedCallback={answerWasDisplayed}
      automaticallyExit={false}
      extraStyles={styles.GameOverModal}>
      <p className={styles.FinalScore}>You scored: {correctCount}</p>
      <GameQuip correctCount={correctCount} />
      <p className={styles.Plug}>Head over to <a href="https://igdb.com">igdb.com</a> to discover more games!</p>
      <button className={styles.PlayAgainButton} onClick={playAgainButtonWasClickedHandler}>Play Again</button>
    </Modal>
  );
};

GameOver.propTypes = {
  history: PropTypes.instanceOf(Object),
  correctCount: PropTypes.number,
  answerWasDisplayed: PropTypes.func
}

export default withRouter(GameOver);