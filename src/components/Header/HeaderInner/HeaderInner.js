import React from 'react';
import PropTypes from 'prop-types';

import Logo from '../../Logo/Logo';

import styles from './HeaderInner.module.scss';

const HeaderInner = props => {
  let headerInnerClasses = [styles.HeaderInner, styles.open];
  if (props.playing) headerInnerClasses = [styles.HeaderInner, styles.closed];

  return (
    <div className={headerInnerClasses.join(' ')}>
      {props.playing ? <div className={styles.Score}>{props.score}</div> : null }
      <Logo playing={props.playing} restartButtonWasClicked={props.restartButtonWasClicked} />
      {props.playing ? null : <button className={styles.StartButton} onClick={props.startButtonWasClicked}>Start The Challenge</button>}
    </div>
  );
};

HeaderInner.propTypes = {
  score: PropTypes.number.isRequired,
  playing: PropTypes.bool.isRequired,
  startButtonWasClicked: PropTypes.func.isRequired,
  restartButtonWasClicked: PropTypes.func.isRequired
}

export default HeaderInner;