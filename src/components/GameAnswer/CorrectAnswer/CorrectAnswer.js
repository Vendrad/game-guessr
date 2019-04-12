import React from 'react';

import styles from './CorrectAnswer.module.scss';
import icon from '../../../assets/images/icons8-rating-128.png';

/**
 * Displays information for a correctly submitted answer
 */
const CorrectAnswer = () => {

  return (
    <div className={styles.CorrectAnswer}>
      <img src={icon} alt="Correct Answer" />
      <p>Correct!</p>
    </div>
  )

};

export default CorrectAnswer;