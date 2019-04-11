import React from 'react';
import { shallow } from 'enzyme';
import { mockCR } from '../../../helpers/testing';

import GameQuip from './GameQuip';
import * as Helpers from '../../../helpers';

describe('<GameQuip />', () => {

  let defaultProps, wrapper, quipNumber, mock;

  const setup = (correctCount) => {
    defaultProps = {
      correctCount: correctCount
    }

    quipNumber = 1;
    mock = jest.fn().mockReturnValue(quipNumber);
    Helpers.randBetweenInclusive = mock;
    wrapper = shallow(<GameQuip {...defaultProps} />);
  };

  afterEach(() => {
    mockCR(mock);
  });

  it('should render without errors.', () => {
    setup(1)
    expect(wrapper.find('.GameQuip')).toHaveLength(1);
  });

  it('should render with a good quip if the score is atleast 5.', () => {
    setup(5);
    expect(wrapper.find('p').getElement().props.children[1]).toBe(wrapper.instance().goodResult()[quipNumber]);
  });

  it('should render with a bad quip if the score is not atleast 5.', () => {
    setup(3);
    expect(wrapper.find('p').getElement().props.children[1]).toBe(wrapper.instance().badResult()[quipNumber]);
  });

});