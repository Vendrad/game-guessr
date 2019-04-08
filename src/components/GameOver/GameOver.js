import React, { useMemo } from 'react';
import { PropTypes } from 'prop-types';
import { withRouter } from 'react-router-dom';

import styles from './GameOver.module.scss';
import Modal from '../UI/Modal/Modal';

import GameQuip from './GameQuip/GameQuip';

const GameOver = (props) => {

  console.log("gameover");

  const playAgainButtonWasClickedHandler = () => {
    props.history.push('/new-game');
  };

  const count = useMemo(() => props.correctCount);

  return (
    <Modal
      modalExitedCallback={props.answerWasDisplayed}
      automaticallyExit={false}
      styles={styles.GameOverModal}>
      <p className={styles.FinalScore}>You scored: {count}</p>
      <GameQuip correctCount={count} />
      <p className={styles.Plug}>Head over to <a href="https://igdb.com">igdb.com</a> to discover more games!</p>
      <button className={styles.PlayAgainButton} onClick={playAgainButtonWasClickedHandler}>Play Again</button>
    </Modal>
  );
};

GameOver.propTypes = {
  correctCount: PropTypes.number
}

export default withRouter(GameOver);