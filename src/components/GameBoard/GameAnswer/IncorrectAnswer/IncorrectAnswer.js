import React from 'react';
import PropTypes from 'prop-types';

import styles from './IncorrectAnswer.module.scss';
import icon from '../../../../assets/images/icons8-delete-128.png'

const IncorrectAnswer = (props) => {

  const gameCover = props.game.cover === null || props.game.cover === undefined
    ? null
    : <img src={props.game.cover} alt={props.game.name + " cover art."} />;
  
  return (
    <div className={styles.IncorrectAnswer}>
      <img src={icon} alt="Incorrect Answer" />
      <div>
        <p>The correct answer was:</p>
        <p>{props.game.name}</p>
        {gameCover}
      </div>
    </div>
  )
};

IncorrectAnswer.propTypes = {
  game: PropTypes.instanceOf(Object).isRequired
}

export default IncorrectAnswer;