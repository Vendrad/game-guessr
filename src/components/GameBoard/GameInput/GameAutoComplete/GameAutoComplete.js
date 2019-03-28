import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Axios from 'axios';

import GameAutoCompleteItem from './GameAutoCompleteItem/GameAutoCompleteItem';

import styles from './GameAutoComplete.module.scss';

const GameAutoComplete = props => {

  const [autoCompleteItemsState, autoCompleteItemsStateSetter] = useState([]);
  
  useEffect(() => {

    if (props.input.length < 3) {
      autoCompleteItemsStateSetter([]);
      return undefined;
    }

    Axios.post('games', 'fields id,name,cover.url;search "' + props.input + '";limit 5;')
      .then(response => {

        if (response.data.length === 0) autoCompleteItemsStateSetter([]);

        autoCompleteItemsStateSetter(response.data);

      });
    
  }, [props.input]);

  const autoCompleteItemWasClickedHandler = (id, name) => {
    autoCompleteItemsStateSetter([]);
    props.autoCompleteItemWasClicked(id, name)
  }

  if (autoCompleteItemsState.length === 0) return null;

  return (
    <div className={styles.GameAutoComplete}>
      <ul>
        {autoCompleteItemsState.map(item => {

          const coverUrl = item.cover && item.cover.url ? item.cover.url : null;

          return <GameAutoCompleteItem
            key={item.id}
            gameId={item.id}
            gameName={item.name}
            gameCover={coverUrl}
            gameAutoCompleteItemWasClicked={autoCompleteItemWasClickedHandler} />
        })}
      </ul>
    </div>
  );
};

GameAutoComplete.propTypes = {
  id: PropTypes.number,
  input: PropTypes.string,
  autoCompleteItemWasClicked: PropTypes.func.isRequired
};

export default GameAutoComplete;