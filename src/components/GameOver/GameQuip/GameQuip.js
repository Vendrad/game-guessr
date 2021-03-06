import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { randBetweenInclusive } from '../../../helpers';

import styles from './GameQuip.module.scss';

/**
 * Renders a random quip depending on the number of correct questions
 */
class GameQuip extends Component {
  /** State set in constructor so it is only called once */
  constructor(props) {
    super(props);

    const { correctCount } = props;
    this.state = {
      quip: this.getQuip(correctCount),
    };
  }

  /**
   * Gets a quip given the given number of correct answers
   *
   * @param {int} correctCount
   * @return {string}
   */
  getQuip(correctCount) {
    return correctCount >= 5
      ? this.goodResult()[randBetweenInclusive(0, this.goodResult().length)]
      : this.badResult()[randBetweenInclusive(0, this.badResult().length)];
  }

  /**
   * Array of quips for when the player has performed poorly
   * @return {Array}
   */
  badResult = () => [
    '/ff',
    'Game Over. Insert coin to continue.',
    'bg',
    "Must've been the lag, right?",
    'Mama mia...',
    'You were not prepared.',
    'Do you always need to be carried this hard?',
    'You call yourself a gamer?',
    'l2p noob',
    'There is no aggro reset...',
    "That's a 50dkp minus!",
    'Game over, man... Game over...',
    'The lights are on but nobody is home.',
  ];

  /**
   * Array of quips for when the player has performed well
   * @return {Array}
   */
  goodResult = () => [
    'omg wtf lag',
    'Your opponent has disconnected...',
    'You have received a friends request from GG.',
    "WOW... You've probably completed Steam too!",
    'M-M-M-Monster Kill!',
    'C-C-C-Combo Breaker!',
    'gg',
    'grats',
    'A WINNER IS YOU',
    'Have you been training with Parzival?',
  ];

  render() {
    const { quip } = this.state;
    return <p className={styles.GameQuip}>{quip}</p>;
  }
}

GameQuip.propTypes = {
  correctCount: PropTypes.number.isRequired,
};

export default GameQuip;
