import React from 'react';
import PropTypes from 'prop-types';

import styles from './IncorrectAnswer.module.scss';
import icon from '../../../assets/images/icons8-delete-128.png';

/**
 * Feedback that the submitted answer was incorrect. Also shows the
 * correct answer.
 */
const IncorrectAnswer = ({game}) => {

  // Setup the game cover image if one exists for the correct game
  const gameCover = game.cover !== null && game.cover !== undefined 
    && <img src={game.cover} alt={`${game.name} cover art.`} />;
  
  return (
    <div className={styles.IncorrectAnswer}>
      <img src={icon} alt="Incorrect Answer" />
      <div>
        <p>The correct answer was:</p>
        <p>{game.name}</p>
        {gameCover}
      </div>
    </div>
  )
};

IncorrectAnswer.propTypes = {
  game: PropTypes.instanceOf(Object).isRequired
}

export default IncorrectAnswer;