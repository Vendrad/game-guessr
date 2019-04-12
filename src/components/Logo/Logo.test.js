import React from 'react';
import { shallow } from 'enzyme';
import { mockCR } from '../../helpers/testing';

import Logo from './Logo';

const defaultProps = {
  playing: true,
  restartButtonWasClicked: jest.fn(),
};

describe('<Logo />', () => {
  let wrapper;
  let spy;

  beforeEach(() => {
    wrapper = shallow(<Logo {...defaultProps} />);
  });

  afterEach(() => {
    spy !== undefined && mockCR(spy);
  });

  it('should render without errors.', () => {
    expect(wrapper.find('div')).toHaveLength(1);
  });

  it('should have a class of closed if playing.', () => {
    expect(wrapper.find('div').find('.closed')).toHaveLength(1);
  });

  it('should have a class of open if not playing.', () => {
    wrapper.setProps({ playing: false });
    expect(wrapper.find('div').find('.open')).toHaveLength(1);
  });

  it('should trigger the callback if clicked.', () => {
    wrapper.find('div').simulate('click');
    expect(defaultProps.restartButtonWasClicked).toHaveBeenCalledTimes(1);
  });
});
