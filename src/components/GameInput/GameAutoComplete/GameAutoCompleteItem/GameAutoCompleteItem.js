import React from 'react';
import PropTypes from 'prop-types';

import styles from './GameAutoCompleteItem.module.scss';
import unknownCover from '../../../../assets/images/icons8-question-mark-64.png'

const GameAutoCompleteItem = props => {
  return (
    <li className={styles.GameAutoCompleteItem} onClick={() => props.gameAutoCompleteItemWasClicked({id: props.gameId, name: props.gameName})}>
      <img src={props.gameCover === null ? unknownCover : props.gameCover} alt={props.gameName + "cover art"} />
      <p>{props.gameName}</p>
    </li>
  )
};

GameAutoCompleteItem.propTypes = {
  gameId: PropTypes.number,
  gameName: PropTypes.string,
  gameCover: PropTypes.string,
  gameAutoCompleteItemWasClicked: PropTypes.func.isRequired
}

export default GameAutoCompleteItem;