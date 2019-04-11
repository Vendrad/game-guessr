import React from 'react';
import { shallow } from 'enzyme';

import GameAutoComplete from './GameAutoComplete';

const defaultProps = {
  input: "Dummy",
  autoCompleteItemWasClicked: jest.fn(),
  inputHasFocus: true
}

const defaultState = {
  autoCompleteItems: [
    {id: 1, name: "Dummy", cover: {url: 'http://www.example.com/cover1.png'}},
    {id: 2, name: "Dummy 2" },
    {id: 3, name: "Dummy 3", cover: {url: 'http://www.example.com/cover2.png'}},
  ]
}

describe('<GameAutoComplete />', () => {

  let wrapper, spy;

  beforeEach(() => {
    wrapper = shallow(<GameAutoComplete {...defaultProps} />);
    wrapper.setState(defaultState);
  });

  afterEach(() => {
    spy !== undefined 
      && spy.mockClear()
      && spy.mockRestore();
  });

  it('should render without errors.', () => {
    expect(wrapper.find('.GameAutoComplete')).toHaveLength(1);
    expect(wrapper.find('GameAutoCompleteItem')).toHaveLength(3);
  });

  it('should not render if there are no autoCompleteItems', () => {
    wrapper.setState({autoCompleteItems: []});
    expect(wrapper.find('.GameAutoComplete')).toHaveLength(0);
  });

  it('should trigger the callback when the auto complete item was clicked handler is called.', () => {
    const game = defaultState.autoCompleteItems[0];
    spy = jest.spyOn(wrapper.instance(), 'setState');

    wrapper.instance().autoCompleteItemWasClickedHandler(game);

    expect(spy).toHaveBeenCalledWith({ autoCompleteItems: [] });
    expect(defaultProps.autoCompleteItemWasClicked).toHaveBeenCalledWith(game);
  });

  it('should search for games on mount.', () => {
    spy = jest.spyOn(GameAutoComplete.prototype, 'searchGames');
    // Remount
    const props = {...defaultProps};
    props.input = 'Dumm';
    shallow(<GameAutoComplete {...props} />);
    expect(spy).toHaveBeenCalledWith('Dumm');
  });

  it('should search for games on update.', () => {
    spy = jest.spyOn(wrapper.instance(), 'searchGames');
    // Edit previous props to make it look like there is a difference
    const props = {...defaultProps};
    props.input = 'Dumm';
    wrapper.instance().componentDidUpdate(props, wrapper.state)
    expect(spy).toHaveBeenCalledWith(defaultProps.input);
  });

  it('it should not search for games if the input matches the previous input.', () => {
    spy = jest.spyOn(wrapper.instance(), 'searchGames');
    wrapper.instance().componentDidUpdate(defaultProps, defaultState)
    expect(spy).toHaveBeenCalledTimes(0);
  });

  it('should store the list of games it gets back from the API.', () => {
    spy = jest.spyOn(wrapper.instance(), 'setState');
    const games = defaultState.autoCompleteItems;
    const expectedState = {autoCompleteItems: games};
    wrapper.instance().searchGamesResponseHandler(games);
    expect(spy).toHaveBeenCalledWith(expectedState);
  });

  it('should have an empty autocomplete list if there are no games in the response.', () => {
    spy = jest.spyOn(wrapper.instance(), 'setState');
    const expectedState = {autoCompleteItems: []};
    wrapper.instance().searchGamesResponseHandler([]);
    expect(spy).toHaveBeenCalledWith(expectedState);
  });

});