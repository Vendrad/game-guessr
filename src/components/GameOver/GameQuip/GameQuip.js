import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { randBetweenInclusive } from '../../../helpers';

import styles from './GameQuip.module.scss';

export class GameQuip extends Component {

  state = {
    quip: null
  }

  componentDidMount() {
    const quip = this.props.correctCount >= 5
      ? this.goodResult()[randBetweenInclusive(0, this.goodResult().length)]
      : this.badResult()[randBetweenInclusive(0, this.badResult().length)];

    this.setState({quip: quip});
  }
  
  badResult () {
    return [
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
      "The lights are on but nobody is home."
    ];
  }  

  goodResult () {
    return [
        "omg wtf lag",
        "Your opponent has disconnected...",
        "You have received a friends request from GG.",
        "WOW... You've probably completed Steam too!",
        "M-M-M-Monster Kill!",
        "C-C-C-Combo Breaker!",
        "gg",
        "grats",
        "A WINNER IS YOU",
        "Have you been training with Parzival?"
      ];
  }

  render () {
    return (
      <p className={styles.GameQuip}>"{this.state.quip}"</p>
    );
  }
}

GameQuip.propTypes = {
  correctCount: PropTypes.number
}

export default GameQuip;