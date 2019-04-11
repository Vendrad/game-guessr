import React from 'react';
import { shallow } from 'enzyme';
import { mockCR } from '../../../helpers/testing';

import Modal from './Modal';
import { CSSTransition } from 'react-transition-group';

const defaultProps = {
  automaticallyExit: false,
  displayCloseButton: false,
  modalExitedCallback: jest.fn(),
  extraStyles: "class1",
  children: <div>SomeText</div>
};

describe('<Modal />', () => {

  let wrapper, spy;

  beforeEach(() => {
    wrapper = shallow(<Modal {...defaultProps} />);
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
    expect(wrapper.find('.Modal').getElement().props.children[0]).toBe(defaultProps.children);
  });

  it('should have an in state of true after mounting.', () => {
    expect(wrapper.state('in')).toEqual(true);
  });
  
  it('should not render the close button if displayclosebutton is false.', () => {
    expect(wrapper.find('.ModalCloseButton')).toHaveLength(0);
  });
  
  it('should render the close button if displayclosebutton is true.', () => {
    wrapper.setProps({displayCloseButton: true});
    expect(wrapper.find('.ModalCloseButton')).toHaveLength(1);
  });
  
  it('should set the in state to false when the closeModalHandler is called.', () => {
    wrapper.instance().closeModalHandler();
    expect(wrapper.state('in')).toEqual(false);
  });
  
});