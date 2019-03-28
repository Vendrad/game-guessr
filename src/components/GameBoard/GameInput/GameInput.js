import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import styles from './GameInput.module.scss';
import GameAutoComplete from './GameAutoComplete/GameAutoComplete';

const GameInput = props => {

  useEffect(() => {
    inputValueStateSetter("");
  }, [props.inputBuster])

  const [inputValueState, inputValueStateSetter] = useState("");

  const autoCompleteItemWasClickedHandler = (id, name) => {
    inputValueStateSetter(name);
    props.gameWasSelected(id);
  };

  const inputValueWasChangedHandler = (event) => {
    if (inputValueState === event.target.value) return;
    
    inputValueStateSetter(event.target.value)

    props.gameWasSelected(null);
  };

  return (
    <div className={styles.GameInput}>
      <GameAutoComplete
        input={inputValueState}
        autoCompleteItemWasClicked={autoCompleteItemWasClickedHandler} />
      <input
        type="text"
        onChange={inputValueWasChangedHandler}
        placeholder="Choose your answer..."
        value={inputValueState}
        />
    </div>
  )
};

GameInput.propTypes = {
  gameWasSelected: PropTypes.func.isRequired,
  inputBuster: PropTypes.number.isRequired
}

export default GameInput;