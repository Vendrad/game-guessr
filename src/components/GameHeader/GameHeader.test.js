import React from 'react';
import { shallow } from 'enzyme';
import { mockCR } from '../../helpers/testing';

import GameHeader from './GameHeader';
import Flyaway from '../UI/Flyaway/Flyaway';
import * as AppConfig from '../../config/App.config';

const defaultProps = {
  correctCount: 2,
  correctCountFlyaway: false,
  mistakeCount: 3,
};

describe('<GameHeader />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<GameHeader {...defaultProps} />);
  });

  it('should render without errors.', () => {
    expect(wrapper.find('.GameHeader')).toHaveLength(1);
  });

  it('should show the correct number of full hearts.', () => {
    const lives = 5;
    const mock = jest.fn().mockReturnValue({ lives });
    AppConfig.AppConfig = mock;

    expect(
      wrapper
        .find('img')
        .getElements()
        .filter(img => img.props.alt === 'Heart Piece - full')
    ).toHaveLength(lives - defaultProps.mistakeCount);

    mockCR(mock);
  });

  it('should show the correct number of empty hearts.', () => {
    const lives = 5;
    const mock = jest.fn().mockReturnValue({ lives });
    AppConfig.AppConfig = mock;

    expect(
      wrapper
        .find('img')
        .getElements()
        .filter(img => img.props.alt === 'Heart Piece - empty')
    ).toHaveLength(defaultProps.mistakeCount);

    mockCR(mock);
  });

  it('should correctly display the number of answers the player has got right.', () => {
    expect(wrapper.find('.CorrectCount').getElement().props.children).toEqual(
      defaultProps.correctCount
    );
  });

  it('should render Flyaway if that is triggered by the prop.', () => {
    wrapper.setProps({ correctCountFlyaway: true });
    expect(wrapper.find(Flyaway)).toHaveLength(1);
  });
});
