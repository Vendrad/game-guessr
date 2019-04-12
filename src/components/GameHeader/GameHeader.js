import React from 'react';
import PropTypes from 'prop-types';

import AppConfig from '../../config/App.config';
import Flyaway from '../UI/Flyaway/Flyaway';

import styles from './GameHeader.module.scss';
import heartFull from '../../assets/images/icons8-heart-full-64.png';
import heartEmpty from '../../assets/images/icons8-heart-empty-64.png';

/**
 * Displays status information about the current game
 */
const GameHeader = ({ correctCount, correctCountFlyaway, mistakeCount }) => {
  /**
   * Returns jsx with full/empty hearts given the maxLives and mistakeCount
   *
   * @param {int} maxLives
   * @param {int} mistakes
   */
  const getLives = (maxLives, mistakes) => {
    // Creates empty array of length maxLives
    let lives = Array.apply(null, [maxLives]);
    // Fills the array with full lives and overrides with empties equal to the mistakes
    lives = lives.fill('full').fill('empty', 0, mistakes);
    // Maps the array to jsx img tag
    const output = lives.map((life, index) => (
      <img
        key={index}
        src={life === 'full' ? heartFull : heartEmpty}
        alt={`Heart Piece - ${life}`}
      />
    ));

    return output;
  };

  /**
   *
   * @param {bool} show
   * @param {object} styles
   */
  const getFlyaway = (show, styling) => show && (
  <Flyaway
    timeout={{
      enter: 200,
      exit: 1000,
    }}
    styles={styling.Flyaway}
    animationStyles={{
      enter: styling.FlyawayEnter,
      enterActive: styling.FlyawayEnterActive,
      exit: styling.FlyawayExit,
      exitActive: styling.FlyawayExitActive,
    }}
  >
    <div>+1</div>
  </Flyaway>
  );

  const maxLives = AppConfig().lives;

  return (
    <div className={styles.GameHeader}>
      <div className={styles.CorrectCount}>{correctCount}</div>
      {getFlyaway(correctCountFlyaway, styles)}
      <div className={styles.MistakeCount}>
        {getLives(maxLives, mistakeCount)}
      </div>
    </div>
  );
};

GameHeader.defaultProps = {
  correctCountFlyaway: false,
};

GameHeader.propTypes = {
  correctCount: PropTypes.number.isRequired,
  correctCountFlyaway: PropTypes.bool,
  mistakeCount: PropTypes.number.isRequired,
};

export default GameHeader;
