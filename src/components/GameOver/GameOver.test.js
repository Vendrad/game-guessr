import React from 'react';
import { shallow } from 'enzyme';
import { mockCR } from '../../helpers/testing';

import { GameOver } from './GameOver';
import Modal from '../UI/Modal/Modal';
import GameQuip from './GameQuip/GameQuip';

const defaultProps = {
  history: { push: jest.fn() },
  location: { pathname: '/' },
  correctCount: 2,
};

describe('<GameOver />', () => {
  let wrapper;
  let spy;

  beforeEach(() => {
    wrapper = shallow(<GameOver {...defaultProps} />);
  });

  afterEach(() => {
    spy !== undefined && mockCR(spy);
  });

  it('should render without errors.', () => {
    expect(wrapper.find(Modal)).toHaveLength(1);
  });

  it('should push to a new game if the play again button is clicked.', () => {
    wrapper.find('button').simulate('click');
    expect(defaultProps.history.push).toHaveBeenCalledWith('/new-game');
  });

  it('should display the players score.', () => {
    expect(
      wrapper
        .find('.FinalScore')
        .getElement()
        .props.children[1].trim()
    ).toBe(defaultProps.correctCount + '');
  });

  it('should pass the players score to GameQuip.', () => {
    expect(wrapper.find(GameQuip).getElement().props.correctCount).toBe(
      defaultProps.correctCount
    );
  });
});
