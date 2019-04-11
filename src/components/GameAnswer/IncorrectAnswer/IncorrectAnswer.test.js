import React from 'react';
import { shallow } from 'enzyme';

import IncorrectAnswer from './IncorrectAnswer';

const defaultProps = {
  game: {id: 1, name: "DummyGame", cover: "http://example.org/image.png"}
}

describe('<IncorrectAnswer />', () => {

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<IncorrectAnswer {...defaultProps} />);
  });

  it('should render without errors.', () => {
    expect(wrapper.find('.IncorrectAnswer')).toHaveLength(1);
  });

  it('should display the game cover if it exists.', () => {
    const imgProps = wrapper.find('img').at(1).getElement().props;
    expect(imgProps.src).toEqual(defaultProps.game.cover);
    expect(imgProps.alt).toEqual(`${defaultProps.game.name} cover art.`);
  });

  it('should not display the game cover if it does not exist.', () => {
    wrapper.setProps({game: {id: 1, name: "DummyGame"}});
    const imgProps = wrapper.find('img').first().getElement().props;
    expect(imgProps.alt).toEqual("Incorrect Answer");
    expect(wrapper.find('img')).toHaveLength(1);
  });

});