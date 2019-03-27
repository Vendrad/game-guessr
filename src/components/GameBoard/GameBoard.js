import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Axios from 'axios';

import GameQuestion from './GameQuestion/GameQuestion.js';

import styles from './GameBoard.module.scss';

const GameBoard = props => {

  const [questionNumberState, questionNumberSetter] = useState(1);
  const [responseState, responseStateSetter] = useState(null);
  const [gameState, gameStateSetter] = useState(null);

  useEffect(() => {

    if (props.gameMode === null) return undefined;

    const [startDate, endDate] = getDates(props.gameMode);
    const offset = randBetweenInclusive(0, 134);

    Axios.post('release_dates', 'fields id,game.name,game.alternative_names.name,game.storyline,y;where y >= ' + startDate + ' & y <= ' + endDate + ' & game.storyline != null & game.category = 0;limit 1;offset ' + offset + ';')
      .then(response => {
        responseStateSetter(response.data[0]);
      });
  }, [questionNumberState, props.gameMode]);

  const getDates = gameMode => {
    const rand = randBetweenInclusive(gameMode.minYear, gameMode.maxYear - 4)
    return [rand, rand + 4];
  };

  const randBetweenInclusive = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const cleanResponse = response => {
    const game = {
      id: response.game.id,
      name: response.game.name,
      year: response.y,
      aliases: knownAs(response.game)
    };

    game.storyline = cleanStoryline(response.game.storyline, game.aliases);
    
    return game;
  };

  const cleanStoryline = (storyline, aliases) => {
    let story = storyline;

    aliases.forEach((name) => {
      const regex = new RegExp(escapeRegExp(name), 'gmi');
      story = story.replace(regex, '[ ... ]');
    })
    
    return story;
  };

  const knownAs = game => {
    let names = [game.name];

    if (typeof game.alternative_names !== 'undefined') {
      game.alternative_names.forEach((alternative_name) => {
        names.push(alternative_name.name);
      })
    }

    return names;
  };

  const escapeRegExp = string => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  };

  // const answerWasSubmittedHandler = () => {
  //   questionNumberSetter(questionNumberState + 1);
  // }

  if (responseState !== null) {
    if (gameState === null || responseState.game.id !== gameState.id) {
      gameStateSetter(cleanResponse(responseState));
    }
  }

  let wrappedClasses = [styles.GameBoard, styles.closed];
  if (props.show) wrappedClasses = [styles.GameBoard, styles.open];

  return (
    <div className={wrappedClasses.join(' ')}>
      <p>Game Mode Details</p>
      <p>Current Score Ticking Down</p>
      <GameQuestion game={gameState} />
      <p>Input</p>
      <p>Submit</p>
    </div>
  );
}

GameBoard.propTypes = {
  show: PropTypes.bool.isRequired,
  gameMode: PropTypes.object,
  questionNumber: PropTypes.number
}

export default GameBoard;