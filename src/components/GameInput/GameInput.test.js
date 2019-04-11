import React from 'react';
import { shallow } from 'enzyme';

import GameInput from './GameInput';
import GameAutoComplete from './GameAutoComplete/GameAutoComplete';

describe('<GameInput />', () => {

  let defaultProps, wrapper, spy;

  beforeEach(() => {

    defaultProps = {
      inputWasChanged: jest.fn(),
      gameWasSelected: jest.fn(),
      inputShouldBeCleared: false,
      inputWasCleared: jest.fn(),
      answerWasSubmitted: jest.fn()
    }

    wrapper = shallow(<GameInput {...defaultProps} />);
  });

  afterEach(() => {
    spy !== undefined 
      && spy.mockClear()
      && spy.mockRestore();
  });

  it('should render without errors.', () => {
    expect(wrapper.find('.GameInput')).toHaveLength(1);
    expect(wrapper.find('input')).toHaveLength(1);
  });

  it('should clear the input and trigger the callback when told to.', () => {
    spy = jest.spyOn(wrapper.instance(), 'setState');
    wrapper.setProps({inputShouldBeCleared: true});
    // wrapper.instance().componentDidUpdate(defaultProps, defaultState)
    expect(spy).toHaveBeenCalledWith({inputValue: ""});
    expect(defaultProps.inputWasCleared).toHaveBeenCalledTimes(1);
  });

  it('should not clear the input and trigger the callback when not told to.', () => {
    spy = jest.spyOn(wrapper.instance(), 'setState');
    wrapper.instance().componentDidUpdate(defaultProps)
    expect(spy).toHaveBeenCalledTimes(0);
    expect(defaultProps.inputWasCleared).toHaveBeenCalledTimes(0);
  });

  it('should load GameAutoComplete if inputHasFocus and input is at least 3 characters.', () => {
    wrapper.setState({inputHasFocus: true, inputValue: "Over 3 Characters"});
    expect(wrapper.find(GameAutoComplete)).toHaveLength(1);
  });

  it('should not load GameAutoComplete if input does not have focus.', () => {
    wrapper.setState({inputHasFocus: false, inputValue: "Over 3 Characters"});
    expect(wrapper.find(GameAutoComplete)).toHaveLength(0);
  });

  it('should not load GameAutoComplete if input is not at least 3 characters.', () => {
    wrapper.setState({inputHasFocus: true, inputValue: "1"});
    expect(wrapper.find(GameAutoComplete)).toHaveLength(0);
  });

  it('should pass autocompleteitemwasclickedhandler to GameAutoComplete.', () => {
    wrapper.setState({inputHasFocus: true, inputValue: "Over 3 Characters"});
    expect(wrapper.find(GameAutoComplete).getElement().props.autoCompleteItemWasClicked).toBe(wrapper.instance().autoCompleteItemWasClickedHandler);
  });

  it('should set input state and fire callback when autocompleteitemwasclickedhandler is triggered.', () => {
    spy = jest.spyOn(wrapper.instance(), 'setState');
    const game = {name: "Dummy Game"};
    wrapper.instance().autoCompleteItemWasClickedHandler(game);

    expect(spy).toHaveBeenCalledWith({
      inputValue: game.name,
      inputHasFocus: false
    });

    expect(defaultProps.gameWasSelected).toHaveBeenCalledWith(game);
  });

  it('should pass the correct handlers to input.', () => {
    const inputProps = wrapper.find('input').getElement().props;
    const component = wrapper.instance();

    expect(inputProps.onChange).toBe(component.inputValueWasChangedHandler);
    expect(inputProps.onFocus).toBe(component.inputGainedFocusHandler);
    expect(inputProps.onKeyPress).toBe(component.keyPressHandler);
  });

  it('should remember that the input was focussed.', () => {
    spy = jest.spyOn(wrapper.instance(), 'setState');
    wrapper.instance().inputGainedFocusHandler();

    expect(spy).toHaveBeenCalledWith({inputHasFocus: true});
  });

  it('should update the state if the input value handler was called with a new value.', () => {
    spy = jest.spyOn(wrapper.instance(), 'setState');
    const event = {target: {value: "Some Text"}};
    wrapper.instance().inputValueWasChangedHandler(event);

    expect(spy).toHaveBeenCalledWith({
      inputValue: event.target.value
    });
  });

  it('should fire callbacks if the input value handler was called with a new value.', () => {
    const event = {target: {value: "Some Text"}};
    wrapper.instance().inputValueWasChangedHandler(event);

    expect(defaultProps.gameWasSelected).toHaveBeenCalledWith(null);
    expect(defaultProps.inputWasChanged).toHaveBeenCalledWith(event.target.value);
  });

  it('should do nothing if the input value handler was called with the same value.', () => {
    spy = jest.spyOn(wrapper.instance(), 'setState');
    const event = {target: {value: "Some Text"}};
    wrapper.setState({inputValue: "Some Text"});
    wrapper.instance().inputValueWasChangedHandler(event);

    expect(defaultProps.gameWasSelected).toHaveBeenCalledTimes(0);
    expect(defaultProps.inputWasChanged).toHaveBeenCalledTimes(0);
    expect(spy).toHaveBeenCalledTimes(0);
  });

  it('should do nothing if the key pressed is not enter when the keypresshandler is called.', () => {
    spy = jest.spyOn(wrapper.instance(), 'setState');
    const event = {key: 'Space'};
    wrapper.setState({inputValue: 'Some Text'});
    wrapper.instance().keyPressHandler(event);
    expect(defaultProps.answerWasSubmitted).toHaveBeenCalledTimes(0);
    expect(spy).toHaveBeenCalledTimes(0);
  });

  it('should do nothing if there is no input when the keypresshandler is called.', () => {
    spy = jest.spyOn(wrapper.instance(), 'setState');
    const event = {key: 'Enter'};
    wrapper.setState({inputValue: ''});
    wrapper.instance().keyPressHandler(event);
    expect(defaultProps.answerWasSubmitted).toHaveBeenCalledTimes(0);
    expect(spy).toHaveBeenCalledTimes(0);
  });

  it('should clear input state and trigger answerWasSubmitte if there is input when the keypresshandler is called with Enter.', () => {
    spy = jest.spyOn(wrapper.instance(), 'setState');
    const event = {key: 'Enter'};
    wrapper.setState({inputValue: 'Some Text'});
    wrapper.instance().keyPressHandler(event);
    expect(defaultProps.answerWasSubmitted).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({inputValue: ""});
  });

});