import React from 'react';
import PropTypes from 'prop-types';
import { truncateString } from '../../helpers';

import Loading from '../UI/Loading/Loading';

import styles from './GameQuestion.module.scss';

const GameQuestion = props => {

  return (
    <div className={styles.GameQuestion}>
      <p className={styles.Year}>{props.game === null ? <Loading /> : props.game.year}</p>
      <p className={styles.Storyline}>{props.game === null ? <Loading /> : truncateString(props.game.storyline, 500)}</p>
    </div>
  );
}

GameQuestion.propTypes = {
  game: PropTypes.instanceOf(Object)
}

export default GameQuestion;