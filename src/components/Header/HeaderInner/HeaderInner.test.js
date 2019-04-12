import React from 'react';
import { shallow } from 'enzyme';
import { mockCR } from '../../../helpers/testing';

import HeaderInner from './HeaderInner';
import Logo from '../../Logo/Logo';

const defaultProps = {
  started: true,
  startButtonWasClicked: jest.fn(),
  restartButtonWasClicked: jest.fn(),
};

describe('<HeaderInner />', () => {
  let wrapper;
  let spy;

  beforeEach(() => {
    wrapper = shallow(<HeaderInner {...defaultProps} />);
  });

  afterEach(() => {
    spy !== undefined && mockCR(spy);
  });

  it('should render without errors.', () => {
    expect(wrapper.find('.HeaderInner')).toHaveLength(1);
  });

  it('should render the Logo.', () => {
    expect(wrapper.find(Logo)).toHaveLength(1);
  });

  it('should not render the button if it started is true.', () => {
    expect(wrapper.find('button')).toHaveLength(0);
  });

  it('should render the button if it started is false.', () => {
    wrapper.setProps({ started: false });
    expect(wrapper.find('.StartButton')).toHaveLength(1);
  });

  it('should call the start handler if the start button is clicked.', () => {
    wrapper.setProps({ started: false });
    wrapper.find('.StartButton').simulate('click');
    expect(defaultProps.startButtonWasClicked).toHaveBeenCalledTimes(1);
  });

  it('should pass the restart handler to Logo', () => {
    wrapper.setProps({ started: false });
    expect(wrapper.find(Logo).getElement().props.restartButtonWasClicked).toBe(
      defaultProps.restartButtonWasClicked
    );
  });
});
