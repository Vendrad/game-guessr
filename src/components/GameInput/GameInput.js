import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './GameInput.module.scss';
import GameAutoComplete from './GameAutoComplete/GameAutoComplete';

export class GameInput extends Component {

  state = {
    inputValue: "",
    inputHasFocus: false
  }

  componentDidUpdate(prevProps, prevState) {
    const {inputShouldBeCleared, inputWasCleared} = this.props;

    if (inputShouldBeCleared && inputShouldBeCleared !== prevProps.inputShouldBeCleared) {
      this.setState({inputValue: ""});
      inputWasCleared();
    }
  }

  autoCompleteItemWasClickedHandler = game => {
    this.setState({
      inputValue: game.name,
      inputHasFocus: false
    });
    
    this.props.gameWasSelected(game);
  };

  inputGainedFocusHandler = () => {
    this.setState({inputHasFocus: true});
  };

  inputValueWasChangedHandler = event => {

    if (this.state.inputValue === event.target.value) {
      this.setState({inputHasFocus: true});
      return;
    }
    
    this.setState({
      inputHasFocus: true,
      inputValue: event.target.value
    });
    
    this.props.gameWasSelected(null);
    this.props.inputWasChanged(event.target.value);
  };

  keyPressHandler = event => {

    if (event.key !== 'Enter') return;

    if (this.state.inputValue === '') return;

    this.props.answerWasSubmitted();

    this.setState({
      inputHasFocus: false,
      inputValue: ""
    });
  }

  render () {

    const {inputValue, inputHasFocus} = this.state;
    const {keyPressHandler} = this.props;

    return (
      <div
        className={styles.GameInput}>
        {inputValue.length >= 3
          &&
          <GameAutoComplete
            input={inputValue}
            autoCompleteItemWasClicked={this.autoCompleteItemWasClickedHandler}
            inputHasFocus={inputHasFocus} />
        }
        <input
          type="text"
          placeholder="Find the game..."
          value={inputValue}
          onChange={this.inputValueWasChangedHandler}
          onFocus={this.inputGainedFocusHandler}
          onKeyPress={keyPressHandler} />
      </div>
    )
  }
};

GameInput.propTypes = {
  inputWasChanged: PropTypes.func.isRequired,
  gameWasSelected: PropTypes.func.isRequired,
  inputShouldBeCleared: PropTypes.bool,
  inputWasCleared: PropTypes.func.isRequired,
  answerWasSubmitted: PropTypes.func.isRequired
}

export default GameInput;