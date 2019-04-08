import React from 'react';
import PropTypes from 'prop-types';

import styles from './GameAutoCompleteItem.module.scss';
import unknownCover from '../../../../assets/images/icons8-question-mark-64.png'

const GameAutoCompleteItem = ({gameId, gameName, gameCover, gameAutoCompleteItemWasClicked}) => {
  return (
    <li className={styles.GameAutoCompleteItem} onClick={() => gameAutoCompleteItemWasClicked({id: gameId, name: gameName})}>
      <img src={gameCover === null ? unknownCover : gameCover} alt={gameName + "cover art"} />
      <p>{gameName}</p>
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