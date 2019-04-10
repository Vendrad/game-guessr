import React from 'react';
import { shallow } from 'enzyme';
import { Route } from 'react-router-dom';

import { Game } from './Game';

const defaultProps = {
  history: { push: jest.fn()},
  location: { pathname: '/new-game'},
  gameModeWasSelected: jest.fn()
};

describe('<Game />', () => {

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Game {...defaultProps} />);
  })

  it('should render without errors.', () => {
    expect(wrapper.find(Route)).toHaveLength(2);
  });
  
});