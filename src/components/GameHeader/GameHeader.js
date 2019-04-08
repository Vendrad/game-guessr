import React from 'react';
import PropTypes from 'prop-types';

import AppConfig from '../../config/App.config';
import Flyaway from '../UI/Flyaway/Flyaway';

import styles from './GameHeader.module.scss';
import heartFull from '../../assets/images/icons8-heart-full-64.png';
import heartEmpty from '../../assets/images/icons8-heart-empty-64.png';

const GameHeader = props => {

  let lives = Array.apply(null, Array(AppConfig.lives));
  lives = lives.fill('full').fill('empty', 0, props.mistakeCount);
  lives = lives.map((life, index) => {
    return <img key={index} src={life === 'full' ? heartFull : heartEmpty} alt={"Heart Piece - " + life} />;
  });

  const GetFlyaway = () => {
    return props.correctCountFlyaway
      ? (
        <Flyaway
          timeout={{
            enter:200,
            exit:1000
          }}
          styles={styles.Flyaway}
          animationStyles={{
            enter: styles.FlyawayEnter,
            enterActive: styles.FlyawayEnterActive,
            exit: styles.FlyawayExit,
            exitActive: styles.FlyawayExitActive
          }}
          >
          <div>+1</div>
        </Flyaway>
      )
      : null;
  };

  return (
    <div className={styles.GameHeader}>
      <div className={styles.CorrectCount}>{props.correctCount}</div>
      {GetFlyaway()}
      <div className={styles.MistakeCount}>{lives}</div>
    </div>
  )
};

GameHeader.propTypes = {
  correctCount: PropTypes.number.isRequired,
  correctCountFlyaway: PropTypes.bool,
  mistakeCount: PropTypes.number.isRequired,
}
export default GameHeader;