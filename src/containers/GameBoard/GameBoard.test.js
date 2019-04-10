import React from 'react';
import { shallow } from 'enzyme';

import { GameBoard } from './GameBoard';
import GameHeader from '../../components/GameHeader/GameHeader';
import AppConfig from '../../config/App.config';

const defaultProps = {
  history: { push: jest.fn()},
  location: { pathname: '/game/00'},
  gameModeWasSelected: jest.fn(),
  match: {params: {slug: "00"}}
};

describe('<GameBoard />', () => {

  let wrapper;
  let spy;

  beforeEach(() => {
    wrapper = shallow(<GameBoard {...defaultProps} />);
  });

  afterEach(() => {
    spy !== undefined 
      && spy.mockClear()
      && spy.mockRestore();
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
    wrapper.setState({questionNumber: wrapper.state('questionNumber') + 1});
    expect(spy).toHaveBeenCalledTimes(1);
  });
  
  it('should not load a new question if question number is the same as previous.', () => {
    spy = jest.spyOn(wrapper.instance(), 'getQuestion');
    wrapper.setState({questionNumber: wrapper.state('questionNumber')});
    expect(spy).toHaveBeenCalledTimes(0);
  });
  
  it('should make an API call with the correct path when getting a new question.', () => {
    spy = jest.spyOn(wrapper.instance(), 'handleGetQuestionRequest');
    wrapper.instance().getQuestion();
    expect(spy).toHaveBeenCalledWith('games/random/2');
  });
  
  it('should set the state correctly once we get a response from the API.', () => {
    spy = jest.spyOn(wrapper.instance(), 'setState');
    const response = {id:27730,game:{id:325,name:"Hellgate: London",storyline:"Hellgate: London takes place in 2038, 18 years after the start of a war: London has been invaded by demons from Hell. These particular hellions are a tireless lot, and have been looking for a way into our universe for a long time. Up until recently, humans have had many champions looking to hold back the flood. Various real-world events are referenced in the background of the Hellgate story as averted crossover attempts. The Crusades were actually undertaken to fight back the minions of Hell, as was the charring of London in the great fire to wipe out the Plague. According to the story line, the famous Knights Templar were the keepers of knowledge on how to battle these demonic forces. Unfortunately, these heroes underwent a charring of their own at the hands of a jealous King Phillip IV, who hated the power they held in the world at large. While the Knights Templar survived as an organization, their numbers were severely diminished and were forced to remain in hiding to stay alive."},y:2007};
    const expectedState = {game:{aliases:["Hellgate: London", "Hellgate:"],id: 325,name: "Hellgate: London",storyline: "[ ... ] takes place in 2038, 18 years after the start of a war: London has been invaded by demons from Hell. These particular hellions are a tireless lot, and have been looking for a way into our universe for a long time. Up until recently, humans have had many champions looking to hold back the flood. Various real-world events are referenced in the background of the Hellgate story as averted crossover attempts. The Crusades were actually undertaken to fight back the minions of Hell, as was the charring of London in the great fire to wipe out the Plague. According to the story line, the famous Knights Templar were the keepers of knowledge on how to battle these demonic forces. Unfortunately, these heroes underwent a charring of their own at the hands of a jealous King Phillip IV, who hated the power they held in the world at large. While the Knights Templar survived as an organization, their numbers were severely diminished and were forced to remain in hiding to stay alive.",year: 2007},gameWindowIn: true};
    wrapper.instance().handleGetQuestionResponse(response);
    expect(spy).toHaveBeenCalledWith(expectedState);
  });
  
  it('should increment question number when a new question is fed.', () => {
    spy = jest.spyOn(wrapper.instance(), 'setState');
    const expectedState = {questionNumber: wrapper.state('questionNumber') + 1};
    wrapper.instance().feedNewQuestion();
    expect(spy).toHaveBeenCalledWith(expectedState);
  });
  
  it('should record input value when input change handler is called.', () => {
    spy = jest.spyOn(wrapper.instance(), 'setState');
    const expectedState = {input: 'test'};
    wrapper.instance().inputWasChangedHandler('test');
    expect(spy).toHaveBeenCalledWith(expectedState);
  });
  
  it('should clear input record and should be cleared intender when the input was cleared handler is called.', () => {
    spy = jest.spyOn(wrapper.instance(), 'setState');
    const expectedState = {inputShouldBeCleared: false, input: ""};
    wrapper.instance().inputWasClearedHandler();
    expect(spy).toHaveBeenCalledWith(expectedState);
  });
  
  it('should store a record of the selected game when the game was selected handler is called.', () => {
    spy = jest.spyOn(wrapper.instance(), 'setState');
    const game = {name: 'dummyGame'};
    const expectedState = {selectedGame: game};
    wrapper.instance().gameWasSelectedHandler(game);
    expect(spy).toHaveBeenCalledWith(expectedState);
  });
  
  it('should clear out the stored answer when the answer was displayed handler is called.', () => {
    spy = jest.spyOn(wrapper.instance(), 'setState');
    const expectedState = {answer: null};
    wrapper.instance().answerWasDisplayedHandler();
    expect(spy).toHaveBeenCalledWith(expectedState);
  });
  
  it('should increment the mistake count if a question is skipped.', () => {
    wrapper.setState({game: {name: 'dummyGame'}});
    spy = jest.spyOn(wrapper.instance(), 'setState');
    const expected = {mistakeCount: wrapper.state('mistakeCount') + 1};
    wrapper.instance().answerWasSubmittedHandler(true);
    expect(spy).toHaveBeenCalledWith(expect.objectContaining(expected));
  });
  
  it('should increment the correct count if the answer is correct.', () => {
    wrapper.setState({game: {name: 'dummyGame'}});
    spy = jest.spyOn(wrapper.instance(), 'setState');
    const mock = jest.fn().mockReturnValue(true);
    wrapper.instance().answerIsCorrect = mock;
    const expected = {correctCount: wrapper.state('correctCount') + 1};

    wrapper.instance().answerWasSubmittedHandler();
    expect(spy).toHaveBeenCalledWith(expect.objectContaining(expected));
    mock.mockClear() && mock.mockRestore();
  });

  it('should increment the mistake count if the answer is false.', () => {
    wrapper.setState({game: {name: 'dummyGame'}});
    spy = jest.spyOn(wrapper.instance(), 'setState');
    const mock = jest.fn().mockReturnValue(false);
    wrapper.instance().answerIsCorrect = mock;
    const expected = {mistakeCount: wrapper.state('mistakeCount') + 1};

    wrapper.instance().answerWasSubmittedHandler();
    expect(spy).toHaveBeenCalledWith(expect.objectContaining(expected));
    mock.mockClear() && mock.mockRestore();
  });
  
  it('should set flag to display game over if all lives are used up.', () => {
    const lives = AppConfig.lives;
    const mock = jest.fn().mockReturnValue(false);
    wrapper.instance().answerIsCorrect = mock;

    wrapper.setState({game: {name: 'dummyGame'}, mistakeCount: lives - 1});
    const expected = {displayGameOverModal: true};

    spy = jest.spyOn(wrapper.instance(), 'setState');
    
    wrapper.instance().answerWasSubmittedHandler();
    expect(spy).toHaveBeenCalledWith(expect.objectContaining(expected));

    mock.mockClear() && mock.mockRestore();
  });
  
  it('should set flag to display game over if all lives are used up.', () => {
    const lives = AppConfig.lives;
    const mock = jest.fn().mockReturnValue(false);
    wrapper.instance().answerIsCorrect = mock;

    wrapper.setState({game: {name: 'dummyGame'}, mistakeCount: lives - 1});
    const expected = {displayGameOverModal: true};

    spy = jest.spyOn(wrapper.instance(), 'setState');
    
    wrapper.instance().answerWasSubmittedHandler();
    expect(spy).toHaveBeenCalledWith(expect.objectContaining(expected));

    mock.mockClear() && mock.mockRestore();
  });

  
});

describe('<GameBoard /> : answerIsCorrect()', () => {

  it('should return true if selectedGame matches game.', () => {
    const selectedGame = {id: 100, name: 'dummyGame'};
    const game = {id: 100, name: 'dummyGame'};
    const input = "";

    expect(GameBoard.prototype.answerIsCorrect(selectedGame, game, input)).toBe(true);
  });
  
  it('should return true if selectedGame name matches game name.', () => {
    const selectedGame = {id: 100, name: 'dummyGame'};
    const game = {id: 200, name: 'dummyGame'};
    const input = "";

    expect(GameBoard.prototype.answerIsCorrect(selectedGame, game, input)).toBe(true);
  });

  it('should return true if input name matches game name.', () => {
    const selectedGame = null;
    const game = {id: 100, name: 'dummyGame'};
    const input = "dummyGame";

    expect(GameBoard.prototype.answerIsCorrect(selectedGame, game, input)).toBe(true);
  });
  
  it('should return false if there is no match.', () => {
    const selectedGame = {id: 200, name: 'otherDummyGame'};
    const game = {id: 100, name: 'dummyGame'};
    const input = "otherDummyGame";

    expect(GameBoard.prototype.answerIsCorrect(selectedGame, game, input)).toBe(false);
  });
  
});