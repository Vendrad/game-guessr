import React from 'react';
import { shallow } from 'enzyme';

import GameAutoCompleteItem from './GameAutoCompleteItem';
import unknownCover from '../../../../assets/images/icons8-question-mark-64.png'

const defaultProps = {
  gameId: 1,
  gameName: 'Dummy Game',
  gameCover: 'http://example.org/cover.png',
  gameAutoCompleteItemWasClicked: jest.fn()
}

describe('<GameAutoCompleteItem />', () => {

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<GameAutoCompleteItem {...defaultProps} />);
  });

  it('should render without errors.', () => {
    expect(wrapper.find('.GameAutoCompleteItem')).toHaveLength(1);
  });

  it('should display the game name.', () => {
    expect(wrapper.find('p').getElement().props.children).toBe(defaultProps.gameName);
  });

  it('should display the cover if present.', () => {
    expect(wrapper.find('img').getElement().props.src).toBe(defaultProps.gameCover);
  });

  it('should display a backup image if the cover is not present.', () => {
    wrapper.setProps({gameCover: null});
    expect(wrapper.find('img').getElement().props.src).toBe(unknownCover);
  });

  it('should trigger callback on click.', () => {
    wrapper.find('.GameAutoCompleteItem').simulate('click')
    expect(defaultProps.gameAutoCompleteItemWasClicked).toHaveBeenCalledWith({id: defaultProps.gameId, name: defaultProps.gameName});
  });

});