import React from 'react';
import { shallow } from 'enzyme';
import { mockCR } from '../../helpers/testing';

import GameModeSelector from './GameModeSelector';
import GameMode from '../../components/GameMode/GameMode';
import * as gameModes from '../../core/gameModes/gameModes';

const defaultProps = {
  gameModeWasSelected: jest.fn()
};

describe('<GameModeSelector />', () => {

  let wrapper;

  beforeEach(() => {
    gameModes.default = jest.fn().mockReturnValue([
      {id: 0, type: 'normal', title: '80s', slug: '80', apiSlug: '0'},
      {id: 1, type: 'normal', title: '90s', slug: '90', apiSlug: '1'}
    ]);

    wrapper = shallow(<GameModeSelector {...defaultProps} />);
  });

  afterEach(() => {
    mockCR(gameModes.default);
  });

  it('should render without errors.', () => {
    const wrapper = shallow(<GameModeSelector {...defaultProps} />);
    expect(wrapper.find(GameMode)).toHaveLength(2);
  });

  it('should fire callback when gameMode is clicked.', () => {
    const gameMode = gameModes.default()[0];
    wrapper.find(GameMode).first().dive().simulate('click');
    expect(defaultProps.gameModeWasSelected).toHaveBeenCalledWith(gameMode);
  });

});