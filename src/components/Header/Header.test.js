import React from 'react';
import { shallow } from 'enzyme';
import { mockCR } from '../../helpers/testing';

import Header from './Header';
import HeaderInner from './HeaderInner/HeaderInner';

const defaultProps = {
  started: true,
  startButtonWasClicked: jest.fn(),
  restartButtonWasClicked: jest.fn(),
};

describe('<Header />', () => {
  let wrapper;
  let spy;

  beforeEach(() => {
    wrapper = shallow(<Header {...defaultProps} />);
  });

  afterEach(() => {
    spy !== undefined && mockCR(spy);
  });

  it('should render without errors.', () => {
    expect(wrapper.find('.Header')).toHaveLength(1);
  });

  it('should render HeaderInner.', () => {
    expect(wrapper.find(HeaderInner)).toHaveLength(1);
  });

  it('should pass the correct parameters to HeaderInner', () => {
    const HeaderInnerProps = wrapper.find(HeaderInner).getElement().props;
    expect(HeaderInnerProps.started).toBe(defaultProps.started);
    expect(HeaderInnerProps.startButtonWasClicked).toBe(
      defaultProps.startButtonWasClicked
    );
    expect(HeaderInnerProps.restartButtonWasClicked).toBe(
      defaultProps.restartButtonWasClicked
    );
  });

  it('should load the footer if not started', () => {
    wrapper.setProps({ started: false });
    expect(wrapper.find('.Footer')).toHaveLength(1);
  });

  it('should not load the footer if started', () => {
    expect(wrapper.find('.Footer')).toHaveLength(0);
  });
});
