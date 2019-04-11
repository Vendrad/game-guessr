import React from 'react';
import { shallow } from 'enzyme';
import { mockCR } from '../../../helpers/testing';

import Flyaway from './Flyaway';
import { CSSTransition } from 'react-transition-group';

const defaultProps = {
  styles: "classes list",
  animationStyles: { in: "class1", out: "class2"},
  timeout: { enter: 200, exit: 1000 },
  cleanup: jest.fn(), 
  children: <div>+1</div>
};

describe('<Flyaway />', () => {

  let wrapper, spy;

  beforeEach(() => {
    wrapper = shallow(<Flyaway {...defaultProps} />);
    wrapper.setState({inState: true});
  })

  afterEach(() => {
    spy !== undefined
      && mockCR(spy);
  })

  it('should render without errors.', () => {
    expect(wrapper.find(CSSTransition)).toHaveLength(1);
  });

  it('should render the content passed as children.', () => {
    expect(wrapper.find(CSSTransition).getElement().props.children).toBe(defaultProps.children);
  });

  it('should have an in state of true after mounting.', () => {
    expect(wrapper.state('in')).toEqual(true);
  });
  
});