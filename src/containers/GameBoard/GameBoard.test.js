import React from 'react';
import { shallow } from 'enzyme';
import { mockCR } from '../../helpers/testing';

import { GameBoard } from './GameBoard';
import GameHeader from '../../components/GameHeader/GameHeader';
import * as AppConfig from '../../config/App.config';
import * as gameManipulators from '../../core/gameManipulators/cleanGameResponse';
import * as gameModes from '../../core/gameModes/gameModes';

const defaultProps = {
  history: { push: jest.fn() },
  location: { pathname: '/game/00' },
  gameModeWasSelected: jest.fn(),
  match: { params: { slug: '00' } },
};

const apiSlugReturn = 2;

describe('<GameBoard />', () => {
  let wrapper;
  let spy;

  beforeEach(() => {
    gameModes.slugToApiSlug = jest.fn().mockReturnValue(apiSlugReturn);
    AppConfig.default = jest.fn().mockReturnValue({ lives: 5 });
    wrapper = shallow(<GameBoard {...defaultProps} />);
  });

  afterEach(() => {
    mockCR(gameModes.slugToApiSlug);
    mockCR(AppConfig.default);
    spy !== undefined && mockCR(spy);
  });

  it('should render without errors.', () => {
    expect(wrapper.find(GameHeader)).toHaveLength(1);
  });

  it('should load a question on mount.', () => {
    // Rewrap after spy setup
    spy = jest.spyOn(GameBoard.prototype, 'getQuestion');
    shallow(<GameBoard {...defaultProps} />);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should load a new question if question number is incremented.', () => {
    spy = jest.spyOn(wrapper.instance(), 'getQuestion');
    wrapper.setState({ questionNumber: wrapper.state('questionNumber') + 1 });
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should not load a new question if question number is the same as previous.', () => {
    spy = jest.spyOn(wrapper.instance(), 'getQuestion');
    wrapper.setState({ questionNumber: wrapper.state('questionNumber') });
    expect(spy).toHaveBeenCalledTimes(0);
  });

  it('should make an API call with the correct path when getting a new question.', () => {
    spy = jest.spyOn(wrapper.instance(), 'handleGetQuestionRequest');
    wrapper.instance().getQuestion();
    expect(spy).toHaveBeenCalledWith(`games/random/${apiSlugReturn}`);
  });

  it('should set the state correctly once we get a response from the API.', () => {
    spy = jest.spyOn(wrapper.instance(), 'setState');

    const response = {
      id: 27730,
      game: { id: 325, name: 'DummyGame', storyline: 'DummyGame' },
      y: 2007,
    };
    const cleaned = {
      aliases: ['DummyGame'],
      id: 325,
      name: 'DummyGame: London',
      storyline: '[ ... ]',
      year: 2007,
    };
    const expectedState = { game: cleaned, gameWindowIn: true };

    gameManipulators.cleanGameResponse = jest.fn().mockReturnValue(cleaned);

    wrapper.instance().handleGetQuestionResponse(response);
    expect(spy).toHaveBeenCalledWith(expectedState);

    mockCR(gameManipulators.cleanGameResponse);
  });

  it('should increment question number when a new question is fed.', () => {
    spy = jest.spyOn(wrapper.instance(), 'setState');
    const expectedState = {
      questionNumber: wrapper.state('questionNumber') + 1,
    };
    wrapper.instance().feedNewQuestion();
    expect(spy).toHaveBeenCalledWith(expectedState);
  });

  it('should record input value when input change handler is called.', () => {
    spy = jest.spyOn(wrapper.instance(), 'setState');
    const expectedState = { input: 'test' };
    wrapper.instance().inputWasChangedHandler('test');
    expect(spy).toHaveBeenCalledWith(expectedState);
  });

  it('should clear input record and should be cleared intender when the input was cleared handler is called.', () => {
    spy = jest.spyOn(wrapper.instance(), 'setState');
    const expectedState = { inputShouldBeCleared: false, input: '' };
    wrapper.instance().inputWasClearedHandler();
    expect(spy).toHaveBeenCalledWith(expectedState);
  });

  it('should store a record of the selected game when the game was selected handler is called.', () => {
    spy = jest.spyOn(wrapper.instance(), 'setState');
    const game = { name: 'dummyGame' };
    const expectedState = { selectedGame: game };
    wrapper.instance().gameWasSelectedHandler(game);
    expect(spy).toHaveBeenCalledWith(expectedState);
  });

  it('should clear out the stored answer when the answer was displayed handler is called.', () => {
    spy = jest.spyOn(wrapper.instance(), 'setState');
    const expectedState = { answer: null };
    wrapper.instance().answerWasDisplayedHandler();
    expect(spy).toHaveBeenCalledWith(expectedState);
  });

  it('should increment the mistake count if a question is skipped.', () => {
    wrapper.setState({ game: { name: 'dummyGame' } });
    spy = jest.spyOn(wrapper.instance(), 'setState');
    const expected = { mistakeCount: wrapper.state('mistakeCount') + 1 };
    wrapper.instance().answerWasSubmittedHandler(true);
    expect(spy).toHaveBeenCalledWith(expect.objectContaining(expected));
  });

  it('should increment the correct count if the answer is correct.', () => {
    wrapper.setState({ game: { name: 'dummyGame' } });
    spy = jest.spyOn(wrapper.instance(), 'setState');
    const mock = jest.fn().mockReturnValue(true);

    // Store a copy of the static method (Done so no conflicts with tests below)
    const answerIsCorrectMethod = GameBoard.answerIsCorrect.bind({});

    // Bind the mock
    GameBoard.answerIsCorrect = mock.bind(GameBoard);
    const expected = { correctCount: wrapper.state('correctCount') + 1 };

    wrapper.instance().answerWasSubmittedHandler();
    expect(spy).toHaveBeenCalledWith(expect.objectContaining(expected));
    mockCR(mock);

    // Bind the static method back
    GameBoard.answerIsCorrect = answerIsCorrectMethod.bind(GameBoard);
  });

  it('should increment the mistake count if the answer is false.', () => {
    wrapper.setState({ game: { name: 'dummyGame' } });
    spy = jest.spyOn(wrapper.instance(), 'setState');
    const mock = jest.fn().mockReturnValue(false);
    // Store a copy of the static method (Done so no conflicts with tests below)
    const answerIsCorrectMethod = GameBoard.answerIsCorrect.bind({});

    // Bind the mock
    GameBoard.answerIsCorrect = mock.bind(GameBoard);
    const expected = { mistakeCount: wrapper.state('mistakeCount') + 1 };

    wrapper.instance().answerWasSubmittedHandler();
    expect(mock).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(expect.objectContaining(expected));
    mockCR(mock);

    // Bind the static method back
    GameBoard.answerIsCorrect = answerIsCorrectMethod.bind(GameBoard);
  });

  it('should set flag to display game over if all lives are used up.', () => {
    AppConfig.default = jest.fn().mockReturnValue({ lives: 1 });
    const mock = jest.fn().mockReturnValue(false);
    // Store a copy of the static method (Done so no conflicts with tests below)
    const answerIsCorrectMethod = GameBoard.answerIsCorrect.bind({});

    // Bind the mock
    GameBoard.answerIsCorrect = mock.bind(GameBoard);

    wrapper.setState({ game: { name: 'dummyGame' } });
    const expected = { displayGameOverModal: true };

    spy = jest.spyOn(wrapper.instance(), 'setState');

    wrapper.instance().answerWasSubmittedHandler();
    expect(spy).toHaveBeenCalledWith(expect.objectContaining(expected));

    mockCR(mock);

    // Bind the static method back
    GameBoard.answerIsCorrect = answerIsCorrectMethod.bind(GameBoard);
  });
});

describe('<GameBoard /> : answerIsCorrect()', () => {
  it('should return true if selectedGame matches game.', () => {
    const selectedGame = { id: 100, name: 'dummyGame' };
    const game = { id: 100, name: 'dummyGame' };
    const input = '';

    expect(GameBoard.answerIsCorrect(selectedGame, game, input)).toBe(true);
  });

  it('should return true if selectedGame name matches game name.', () => {
    const selectedGame = { id: 100, name: 'dummyGame' };
    const game = { id: 200, name: 'dummyGame' };
    const input = '';

    expect(GameBoard.answerIsCorrect(selectedGame, game, input)).toBe(true);
  });

  it('should return true if input name matches game name.', () => {
    const selectedGame = null;
    const game = { id: 100, name: 'dummyGame' };
    const input = 'dummyGame';

    expect(GameBoard.answerIsCorrect(selectedGame, game, input)).toBe(true);
  });

  it('should return false if there is no game match.', () => {
    const selectedGame = { id: 200, name: 'otherDummyGame' };
    const game = { id: 100, name: 'dummyGame' };
    const input = 'otherDummyGame';

    expect(GameBoard.answerIsCorrect(selectedGame, game, input)).toBe(false);
  });
});
