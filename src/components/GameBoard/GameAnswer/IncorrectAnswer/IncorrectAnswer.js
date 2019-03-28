import React from 'react';
import PropTypes from 'prop-types';

import styles from './IncorrectAnswer.module.scss';
import emptyCover from '../../../../assets/images/icons8-question-mark-64.png';

const IncorrectAnswer = (props) => {

  const gameCover = props.game.cover === null || props.game.cover === undefined ? emptyCover : props.game.cover;
  
  return (
    <div className={styles.IncorrectAnswer}>
      <p>X : The correct answer was:</p>
      <p>{props.game.name}</p>
      <img src={gameCover} alt={props.game.name + " cover art."} />
    </div>
  )
};

IncorrectAnswer.propTypes = {
  game: PropTypes.typeOf(Object).isRequired
}

export default IncorrectAnswer;