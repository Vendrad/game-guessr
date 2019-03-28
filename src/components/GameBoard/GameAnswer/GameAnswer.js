import React from 'react';
import PropTypes from 'prop-types';
import CorrectAnswer from './CorrectAnswer/CorrectAnswer';
import IncorrectAnswer from './IncorrectAnswer/IncorrectAnswer';

const GameAnswer = (props) => {

  if (props.answeredCorrectly) return <CorrectAnswer />;
  
  return <IncorrectAnswer game={props.correctGame} />;

};

GameAnswer.propTypes = {
  answeredCorrectly: PropTypes.bool.isRequired,
  correctGame: PropTypes.typeOf(Object).isRequired
}

export default GameAnswer;