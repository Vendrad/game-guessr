import React from 'react';
import PropTypes from 'prop-types';
import { truncateString } from '../../helpers';

import styles from './GameQuestion.module.scss';

const GameQuestion = ({game}) => {

  return (
    <div className={styles.GameQuestion}>
      <p className={styles.Year}>{game !== null && game.year}</p>
      <p className={styles.Storyline}>{game !== null && truncateString(game.storyline, 500)}</p>
    </div>
  );
}

GameQuestion.propTypes = {
  game: PropTypes.instanceOf(Object)
}

export default GameQuestion;