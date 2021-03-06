import React from 'react';
import { shallow } from 'enzyme';
import { mockCR } from '../../helpers/testing';

import GameAdvanceQuestion from './GameAdvanceQuestion';
import GameSkip from './GameSkip/GameSkip';
import GameSubmit from './GameSubmit/GameSubmit';

const defaultProps = {
  disabled: false,
  answerWasSubmitted: jest.fn(),
};

describe('<GameAdvanceQuestion />', () => {
  let wrapper;
  let spy;

  beforeEach(() => {
    wrapper = shallow(<GameAdvanceQuestion {...defaultProps} />);
  });

  afterEach(() => {
    spy !== undefined && mockCR(spy);
  });

  it('should render without errors.', () => {
    expect(wrapper.find(GameSkip)).toHaveLength(1);
    expect(wrapper.find(GameSubmit)).toHaveLength(1);
  });
});
