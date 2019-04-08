import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { randBetweenInclusive } from '../../../helpers';

import styles from './GameQuip.module.scss';

const GameQuip = ({correctCount}) => {

  const [quipState, quipStateSetter] = useState(null);

  useEffect(() => {
    const quip = correctCount >= 5
      ? goodResult[randBetweenInclusive(0, goodResult.length)]
      : badResult[randBetweenInclusive(0, goodResult.length)];
    
    quipStateSetter(quip);
  }, []);

  console.log("gamequip");
  const badResult = [
    "/ff",
    "Game Over. Insert coin to continue.",
    "bg",
    "Must've been the lag, right?",
    "Mama mia...",
    "You were not prepared.",
    "Do you always need to be carried this hard?",
    "You call yourself a gamer?",
    "l2p noob",
    "There is no aggro reset...",
    "That's a 50dkp minus!",
    "Game over, man... Game over...",
    "The lights are on but nobody is home.",
  ];

  const goodResult = [
    "omg wtf lag",
    "Your opponent has disconnected...",
    "You have received a friends request from GG.",
    "I bet you've completed your steam collection.",
    "M-M-M-Monster Kill!",
    "C-C-C-Combo Breaker!",
    "gg",
    "grats",
    "A WINNER IS YOU",
    "Parzival wished he had your skills."

  ];

  return (
    <p className={styles.GameQuip}>"{quipState}"</p>
  );
}

GameQuip.propTypes = {
  correctCount: PropTypes.number
}

export default GameQuip;