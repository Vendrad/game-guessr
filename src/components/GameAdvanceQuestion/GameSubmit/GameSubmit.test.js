import React from 'react';
import { shallow } from 'enzyme';

import GameSubmit from './GameSubmit';

const defaultProps = {
  disabled: false,
  answerWasSubmitted: jest.fn()
};

describe('<GameSubmit />', () => {

  let wrapper;
  let spy;

  beforeEach(() => {
    wrapper = shallow(<GameSubmit {...defaultProps} />);
  });

  afterEach(() => {
    spy !== undefined 
      && spy.mockClear()
      && spy.mockRestore();
  });

  it('should render without errors.', () => {
    expect(wrapper.find("button")).toHaveLength(1);
  });

  it('should fire callback when the submit button is clicked.', () => {
    wrapper.find("button").simulate('click');
    expect(defaultProps.answerWasSubmitted).toHaveBeenCalledWith(false);
  });

  it('should not be disabled if the disabled prop is false.', () => {
    expect(wrapper.find('button').render()[0].attribs.disabled).toBe(undefined);
  });

  it('should have the active class if the disabled prop is false.', () => {
    expect(wrapper.find('button').hasClass('active')).toEqual(true);
  });

  it('should be disabled if the disabled prop is true.', () => {
    wrapper.setProps({disabled: true});
    expect(wrapper.find('button').render()[0].attribs.disabled).toBe("");
  });

  it('should have the inactive class if the disabled prop is true.', () => {
    wrapper.setProps({disabled: true});
    expect(wrapper.find('button').hasClass('inactive')).toEqual(true);
  });

});