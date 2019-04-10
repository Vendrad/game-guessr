import React from 'react';
import { shallow } from 'enzyme';

import { App } from './App';
import Header from '../../components/Header/Header';
import Game from '../Game/Game';

const defaultProps = {
  history: { push: jest.fn()},
  location: { pathname: '/'}
};

describe('<App />', () => {

  let wrapper, spy;

  beforeEach(() => {
    wrapper = shallow(<App {...defaultProps} />);
  })

  afterEach(() => {
    spy !== undefined
      && spy.mockClear()
      && spy.mockRestore();
  })

  it('should render without errors.', () => {
    expect(wrapper.find(Header)).toHaveLength(1);
  });

  it('should load <Game /> when not at the root path.', () => {
    wrapper.setProps({location: {pathname: '/new-game'}});
    expect(wrapper.find(Game)).toHaveLength(1);
  });

  it('should restart the app when App is updated on root.', () => {
    wrapper.setState({started: true});
    expect(wrapper.instance().state.started).toEqual(false);
  });

  it('should update state and go to /new-game when the start button handler is called', () => {
    const spy = jest.spyOn(wrapper.instance(), 'setState');
    wrapper.instance().startButtonWasClickedHandler();
    expect(spy).toHaveBeenCalledWith({started: true});
    expect(defaultProps.history.push).toHaveBeenCalledWith('/new-game');
  });
  
  it('should go to root page with started=false when the restart button handler is called', () => {
    wrapper.setState({location: { pathname: '/new-game'}, started: true});
    wrapper.instance().restartButtonWasClickedHandler();
    expect(wrapper.state().started).toEqual(false);
    expect(defaultProps.history.push).toHaveBeenCalledWith('/');
  });
  
  it('should go to a specific page when gameMode is selected handler is called', () => {
    const gameMode = {id: 2, type: 'normal', title: '00s', slug: '00', apiSlug: '2'};
    wrapper.instance().gameModeWasSelectedHandler(gameMode);
    expect(defaultProps.history.push).toHaveBeenCalledWith('/game/00');
  });
  
});