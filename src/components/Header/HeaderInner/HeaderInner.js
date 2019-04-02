import React from 'react';
import PropTypes from 'prop-types';

import Logo from '../../Logo/Logo';

import styles from './HeaderInner.module.scss';

const HeaderInner = props => {

  return (
    <div className={styles.HeaderInner}>
      <Logo playing={props.playing} restartButtonWasClicked={props.restartButtonWasClicked} />
      {props.playing ? null : <button className={styles.StartButton} onClick={props.startButtonWasClicked}>START</button>}
    </div>
  );
};

HeaderInner.propTypes = {
  playing: PropTypes.bool.isRequired,
  startButtonWasClicked: PropTypes.func.isRequired,
  restartButtonWasClicked: PropTypes.func.isRequired
}

export default HeaderInner;