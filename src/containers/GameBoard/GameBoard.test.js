import React from 'react';
import { shallow } from 'enzyme';
import { GameBoard } from './GameBoard';
import GameHeader from '../../components/GameHeader/GameHeader';

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
});