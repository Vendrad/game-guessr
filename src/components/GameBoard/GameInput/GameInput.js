import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import styles from './GameInput.module.scss';
import GameAutoComplete from './GameAutoComplete/GameAutoComplete';

const GameInput = props => {

  useEffect(() => {
    inputValueStateSetter("");
    props.inputWasCleared();
  }, [props.inputClear])

  const [inputValueState, inputValueStateSetter] = useState("");
  const [inputHasFocusState, inputHasFocusStateSetter] = useState(false);

  const autoCompleteItemWasClickedHandler = (id, name) => {
    inputValueStateSetter(name);
    inputHasFocusStateSetter(false);
    props.gameWasSelected(id);
  };

  const inputGainedFocusHandler = () => {
    inputHasFocusStateSetter(true);
  };

  const inputValueWasChangedHandler = (event) => {
    inputHasFocusStateSetter(true);
    if (inputValueState === event.target.value) return;
    
    inputValueStateSetter(event.target.value)

    props.gameWasSelected(null);
  };

  return (
    <div
      className={styles.GameInput}>
      <GameAutoComplete
        input={inputValueState}
        autoCompleteItemWasClicked={autoCompleteItemWasClickedHandler}
        inputHasFocus={inputHasFocusState} />
      <input
        type="text"
        onChange={inputValueWasChangedHandler}
        onFocus={inputGainedFocusHandler}
        placeholder="Find the match..."
        value={inputValueState}
        />
    </div>
  )
};

GameInput.propTypes = {
  gameWasSelected: PropTypes.func.isRequired,
  inputClear: PropTypes.bool,
  inputWasCleared: PropTypes.func
}

export default GameInput;