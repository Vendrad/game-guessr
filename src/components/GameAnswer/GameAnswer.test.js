import React from 'react';
import { shallow } from 'enzyme';

import GameAnswer from './GameAnswer';
import Modal from '../UI/Modal/Modal';
import CorrectAnswer from './CorrectAnswer/CorrectAnswer';
import IncorrectAnswer from './IncorrectAnswer/IncorrectAnswer';

const defaultProps = {
  answer: {
    wasCorrect: true,
    correctGame: {
      id: 1,
      name: 'DummyGame',
      cover: 'http://example.org/image.png',
    },
  },
  answerWasDisplayed: jest.fn(),
};

describe('<GameAnswer />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<GameAnswer {...defaultProps} />);
  });

  it('should render without errors.', () => {
    expect(wrapper.find(Modal)).toHaveLength(1);
  });

  it('should display CorrectAnswer if the answer was correct.', () => {
    expect(wrapper.find(CorrectAnswer)).toHaveLength(1);
  });

  it('should not display IncorrectAnswer if the answer was correct.', () => {
    expect(wrapper.find(IncorrectAnswer)).toHaveLength(0);
  });

  it('should display IncorrectAnswer if the answer was incorrect.', () => {
    wrapper.setProps({
      answer: {
        wasCorrect: false,
        correctGame: {
          id: 1,
          name: 'DummyGame',
          cover: 'http://example.org/image.png',
        },
      },
    });
    expect(wrapper.find(IncorrectAnswer)).toHaveLength(1);
  });

  it('should not display CorrectAnswer if the answer was incorrect.', () => {
    wrapper.setProps({
      answer: {
        wasCorrect: false,
        correctGame: {
          id: 1,
          name: 'DummyGame',
          cover: 'http://example.org/image.png',
        },
      },
    });
    expect(wrapper.find(CorrectAnswer)).toHaveLength(0);
  });

  it('should pass the correct game into IncorrectAnswer.', () => {
    const props = {
      answer: {
        wasCorrect: false,
        correctGame: {
          id: 1,
          name: 'DummyGame',
          cover: 'http://example.org/image.png',
        },
      },
    };
    wrapper.setProps(props);
    expect(wrapper.find(IncorrectAnswer).props()).toEqual({
      game: props.answer.correctGame,
    });
  });
});
