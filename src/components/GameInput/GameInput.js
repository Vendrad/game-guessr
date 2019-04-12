import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './GameInput.module.scss';
import GameAutoComplete from './GameAutoComplete/GameAutoComplete';

class GameInput extends Component {
  state = {
    inputValue: '',
    inputHasFocus: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { inputShouldBeCleared, inputWasCleared } = this.props;

    if (
      inputShouldBeCleared
      && inputShouldBeCleared !== prevProps.inputShouldBeCleared
    ) {
      // Safe usage given prevProps required to determine if input
      // should be cleared.
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ inputValue: '' });
      inputWasCleared();
    }
  }

  autoCompleteItemWasClickedHandler = (game) => {
    this.setState({
      inputValue: game.name,
      inputHasFocus: false,
    });

    const { gameWasSelected } = this.props;

    gameWasSelected(game);
  };

  inputGainedFocusHandler = () => {
    this.setState({ inputHasFocus: true });
  };

  inputValueWasChangedHandler = (event) => {
    const { inputValue } = this.state;
    const { gameWasSelected, inputWasChanged } = this.props;

    if (inputValue === event.target.value) return;

    this.setState({
      inputValue: event.target.value,
    });

    gameWasSelected(null);
    inputWasChanged(event.target.value);
  };

  keyPressHandler = (event) => {
    const { inputValue } = this.state;
    const { answerWasSubmitted } = this.props;

    if (event.key !== 'Enter') return;

    if (inputValue === '') return;

    answerWasSubmitted();

    this.setState({
      inputValue: '',
    });
  };

  render() {
    const { inputValue, inputHasFocus } = this.state;

    return (
      <div className={styles.GameInput}>
        {inputHasFocus && inputValue.length >= 3 && (
          <GameAutoComplete
            input={inputValue}
            autoCompleteItemWasClicked={this.autoCompleteItemWasClickedHandler}
          />
        )}
        <input
          type="text"
          placeholder="Find the game..."
          value={inputValue}
          onChange={this.inputValueWasChangedHandler}
          onFocus={this.inputGainedFocusHandler}
          onKeyPress={this.keyPressHandler}
        />
      </div>
    );
  }
}

GameInput.propTypes = {
  inputWasChanged: PropTypes.func.isRequired,
  gameWasSelected: PropTypes.func.isRequired,
  inputShouldBeCleared: PropTypes.bool.isRequired,
  inputWasCleared: PropTypes.func.isRequired,
  answerWasSubmitted: PropTypes.func.isRequired,
};

export default GameInput;
