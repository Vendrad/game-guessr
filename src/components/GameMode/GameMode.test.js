import React from 'react';
import { shallow } from 'enzyme';
import { mockCR } from '../../helpers/testing';

import GameMode from './GameMode';

describe('<GameMode />', () => {
  let defaultProps;
  let wrapper;
  let spy;

  beforeEach(() => {
    defaultProps = {
      gameMode: {
        id: 0,
        type: 'normal',
        title: '80s',
        slug: '80',
        apiSlug: '0',
      },
      gameModeWasSelected: jest.fn(),
    };

    wrapper = shallow(<GameMode {...defaultProps} />);
  });

  afterEach(() => {
    spy !== undefined && mockCR(spy);
  });

  it('should render without errors.', () => {
    expect(wrapper.find('.GameMode')).toHaveLength(1);
  });

  it('should render with the given title.', () => {
    expect(wrapper.find('p').getElement().props.children).toBe(
      defaultProps.gameMode.title
    );
  });

  it('should fire the callback when it is clicked.', () => {
    wrapper.find('.GameMode').simulate('click');
    expect(defaultProps.gameModeWasSelected).toHaveBeenCalledWith(
      defaultProps.gameMode.id
    );
  });
});
