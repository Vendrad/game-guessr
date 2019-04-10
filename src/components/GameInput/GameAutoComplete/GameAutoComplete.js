import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Axios from 'axios';
import { encodeUrlString } from '../../../helpers'; 

import GameAutoCompleteItem from './GameAutoCompleteItem/GameAutoCompleteItem';

import styles from './GameAutoComplete.module.scss';

const GameAutoComplete = ({id, input, autoCompleteItemWasClicked, inputHasFocus}) => {

  const [autoCompleteItemsState, autoCompleteItemsStateSetter] = useState([]);
  const [blockNextInputUpdateState, blockNextInputUpdateStateSetter] = useState(false);

  let _isMounted = true;
  
  useEffect(() => {

    if (input.length < 3) {
      return undefined;
    }

    if (blockNextInputUpdateState) {
      blockNextInputUpdateStateSetter(false);
      return undefined;
    }

    const source = Axios.CancelToken.source();

    Axios.get(`games/search/${encodeUrlString(input)}`)
      .then(response => {

        if (!_isMounted) return;

        if (response.data.length === 0) autoCompleteItemsStateSetter([]);

        autoCompleteItemsStateSetter(response.data);

      });

    return () => {
      _isMounted = false;
      source.cancel("GameAutoComplete - Cleanup: Request no longer needed.");
    };
    
  }, [input, inputHasFocus]);

  const autoCompleteItemWasClickedHandler = (game) => {
    autoCompleteItemsStateSetter([]);
    blockNextInputUpdateStateSetter(true);
    autoCompleteItemWasClicked(game)
  }

  if (autoCompleteItemsState.length === 0) return null;

  return (
    <div className={styles.GameAutoComplete}>
      <div>
        <ul>
          {autoCompleteItemsState.map(item => {

            const coverUrl = item.cover && item.cover.url && item.cover.url;

            return <GameAutoCompleteItem
              key={item.id}
              gameId={item.id}
              gameName={item.name}
              gameCover={coverUrl}
              gameAutoCompleteItemWasClicked={autoCompleteItemWasClickedHandler} />
          })}
        </ul>
      </div>
    </div>
  );
};

GameAutoComplete.propTypes = {
  id: PropTypes.number,
  input: PropTypes.string,
  autoCompleteItemWasClicked: PropTypes.func.isRequired,
  inputHasFocus: PropTypes.bool.isRequired
};

export default GameAutoComplete;