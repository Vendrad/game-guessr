import React from 'react';
import { shallow } from 'enzyme';
import { mockCR } from '../../../helpers/testing';

import GameSkip from './GameSkip';

const defaultProps = {
  answerWasSubmitted: jest.fn(),
};

describe('<GameSkip />', () => {
  let wrapper;
  let spy;

  beforeEach(() => {
    wrapper = shallow(<GameSkip {...defaultProps} />);
  });

  afterEach(() => {
    spy !== undefined && mockCR(spy);
  });

  it('should render without errors.', () => {
    expect(wrapper.find('button')).toHaveLength(1);
  });

  it('should fire callback when the skip button is clicked.', () => {
    wrapper.find('button').simulate('click');
    expect(defaultProps.answerWasSubmitted).toHaveBeenCalledWith(true);
  });
});
