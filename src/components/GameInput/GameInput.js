import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './GameInput.module.scss';
import GameAutoComplete from './GameAutoComplete/GameAutoComplete';

/**
 * The game search input box
 *
 * This also controls the autocomplete list
 */
class GameInput extends Component {
  state = {
    inputValue: '',
    inputHasFocus: false,
  };

  /**
   * Whenever the component updates it checks if a signal has come to
   * clear the input. If so, the state is cleared and a callback is fired.
   *
   * @param {*} prevProps
   * @param {*} prevState
   */
  componentDidUpdate(prevProps, prevState) {
    const { inputShouldBeCleared, inputWasCleared } = this.props;
    const { inputShouldBeCleared: prevInputShouldBeCleared } = prevProps;

    if (
      inputShouldBeCleared
      && inputShouldBeCleared !== prevInputShouldBeCleared
    ) {
      // Safe usage given prevProps required to determine if input
      // should be cleared.
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ inputValue: '' });
      inputWasCleared();
    }
  }

  /**
   * Handler that is fired if an item on the autocomplete list was clicked
   *
   * This is used to ensure the input field is updated with the name of the
   * selected game and that the game is passed back up to the rest of the app.
   */
  autoCompleteItemWasClickedHandler = (game) => {
    this.setState({
      inputValue: game.name,
      inputHasFocus: false,
    });

    const { gameWasSelected } = this.props;

    gameWasSelected(game);
  };

  /**
   * When the input gains focus we store this information so that the
   * autocomplete list is only displayed when the input field has focus.
   */
  inputGainedFocusHandler = () => {
    this.setState({ inputHasFocus: true });
  };

  /**
   * Fired when the input changes
   *
   * Used to store the input in state for the autocomplete
   * list and to pass the input to the rest of the app. No
   * change is made if the input matches its previous state.
   */
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

  /**
   * Handler to check for the enter key press
   *
   * Used to submit the answer without clicking the submit button
   * directly and also blocks submitting when no input is supplied.
   */
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
