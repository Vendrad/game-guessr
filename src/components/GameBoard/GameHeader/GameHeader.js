import React from 'react';
import PropTypes from 'prop-types';

import styles from './GameHeader.module.scss';
import heartFull from '../../../assets/images/icons8-heart-full-64.png';
import heartEmpty from '../../../assets/images/icons8-heart-empty-64.png';

const GameHeader = props => {

  let lives = Array.apply(null, Array(10));
  lives = lives.fill('full').fill('empty', 0, props.mistakeCount);
  lives = lives.map((life, index) => {
    return <img key={index} src={life === 'full' ? heartFull : heartEmpty} alt={"Heart Piece - " + life} />;
  });

  return (
    <div className={styles.GameHeader}>
      <div className={styles.QuestionNumber}>{props.questionNumber}</div>
      <div className={styles.MistakeCount}>{lives}</div>
    </div>
  )
};

GameHeader.propTypes = {
  questionNumber: PropTypes.number.isRequired,
  mistakeCount: PropTypes.number.isRequired
}
export default GameHeader;