import React from 'react';
import PropTypes from 'prop-types';

import styles from './GameOver.module.scss';
import Modal from '../UI/Modal/Modal';

const GameOver = (props) => {

  return (
    <Modal
      modalExitedCallback={props.answerWasDisplayed}
      automaticallyExit={false}
      styles={styles.GameOverModal}>
      END - Refresh to restart
    </Modal>
  )
};

GameOver.propTypes = {
}

export default GameOver;