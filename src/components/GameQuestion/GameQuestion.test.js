import React from 'react';
import { shallow } from 'enzyme';
import { mockCR } from '../../helpers/testing';

import GameQuestion from './GameQuestion';
import * as Helpers from '../../helpers';

const defaultProps = {
  game: { year: 2000, storyline: 'Story'}
};

describe('<GameQuestion />', () => {

  let wrapper, spy;

  beforeEach(() => {
    wrapper = shallow(<GameQuestion {...defaultProps} />);
  })

  afterEach(() => {
    spy !== undefined
      && mockCR(spy);
  })

  it('should render without errors.', () => {
    expect(wrapper.find('.GameQuestion')).toHaveLength(1);
  });

  it('should render the game year.', () => {
    expect(wrapper.find('.Year').getElement().props.children).toBe(defaultProps.game.year);
  });

  it('should render the game storyline.', () => {
    const expectedString = defaultProps.game.storyline;
    spy = jest.fn().mockReturnValue(expectedString);
    Helpers.truncateString = spy;
    const wrapper = shallow(<GameQuestion {...defaultProps} />);
    expect(wrapper.find('.Storyline').getElement().props.children).toBe(expectedString);
  });

});