import React from 'react';
import PropTypes from 'prop-types';

import styles from './GameAutoCompleteItem.module.scss';
import unknownCover from '../../../../assets/images/icons8-question-mark-64.png';

/**
 * Specific item for the game search autocomplete list
 */
const GameAutoCompleteItem = ({
  gameId,
  gameName,
  gameCover,
  gameAutoCompleteItemWasClicked,
}) => (
  <li>
    <div
      role="menuitem"
      tabIndex={0}
      className={styles.GameAutoCompleteItem}
      onClick={() => gameAutoCompleteItemWasClicked({ id: gameId, name: gameName })
      }
      onKeyPress={() => {}}
    >
      <img src={gameCover} alt={`${gameName} cover art`} />
      <p>{gameName}</p>
    </div>
  </li>
);

GameAutoCompleteItem.defaultProps = {
  gameCover: unknownCover,
};

GameAutoCompleteItem.propTypes = {
  gameId: PropTypes.number.isRequired,
  gameName: PropTypes.string.isRequired,
  gameCover: PropTypes.string,
  gameAutoCompleteItemWasClicked: PropTypes.func.isRequired,
};

export default GameAutoCompleteItem;
