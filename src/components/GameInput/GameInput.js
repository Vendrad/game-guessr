import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import styles from './GameInput.module.scss';
import GameAutoComplete from './GameAutoComplete/GameAutoComplete';

const GameInput = ({inputWasChanged, gameWasSelected, inputShouldBeCleared, inputWasCleared, answerWasSubmitted}) => {

  useEffect(() => {
    inputValueStateSetter("");
    inputWasCleared();
  }, [inputShouldBeCleared])

  const [inputValueState, inputValueStateSetter] = useState("");
  const [inputHasFocusState, inputHasFocusStateSetter] = useState(false);

  const autoCompleteItemWasClickedHandler = game => {
    inputValueStateSetter(game.name);
    inputHasFocusStateSetter(false);
    gameWasSelected(game);
  };

  const inputGainedFocusHandler = () => {
    inputHasFocusStateSetter(true);
  };

  const inputValueWasChangedHandler = event => {

    inputHasFocusStateSetter(true);

    if (inputValueState === event.target.value) return;
    
    inputValueStateSetter(event.target.value)
    
    gameWasSelected(null);
    inputWasChanged(event.target.value);
  };

  const keyPressHandler = event => {

    if (event.key !== 'Enter') return;

    if (inputValueState === '') return;

    answerWasSubmitted();
    inputValueStateSetter("");
    inputHasFocusStateSetter(false);
  }

  return (
    <div
      className={styles.GameInput}>
      {inputValueState.length >= 3
        &&
        <GameAutoComplete
          input={inputValueState}
          autoCompleteItemWasClicked={autoCompleteItemWasClickedHandler}
          inputHasFocus={inputHasFocusState} />
      }
      <input
        type="text"
        placeholder="Find the game..."
        value={inputValueState}
        onChange={inputValueWasChangedHandler}
        onFocus={inputGainedFocusHandler}
        onKeyPress={keyPressHandler} />
    </div>
  )
};

GameInput.propTypes = {
  inputWasChanged: PropTypes.func.isRequired,
  gameWasSelected: PropTypes.func.isRequired,
  inputShouldBeCleared: PropTypes.bool,
  inputWasCleared: PropTypes.func.isRequired,
  answerWasSubmitted: PropTypes.func.isRequired
}

export default GameInput;