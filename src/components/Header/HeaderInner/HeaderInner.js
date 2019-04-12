import React from 'react';
import PropTypes from 'prop-types';

import Logo from '../../Logo/Logo';

import styles from './HeaderInner.module.scss';

const HeaderInner = ({
  started,
  startButtonWasClicked,
  restartButtonWasClicked,
}) => (
  <div className={styles.HeaderInner}>
    <Logo playing={started} restartButtonWasClicked={restartButtonWasClicked} />
    {!started && (
      <button
        type="button"
        className={styles.StartButton}
        onClick={startButtonWasClicked}
      >
        START
      </button>
    )}
  </div>
);

HeaderInner.propTypes = {
  started: PropTypes.bool.isRequired,
  startButtonWasClicked: PropTypes.func.isRequired,
  restartButtonWasClicked: PropTypes.func.isRequired,
};

export default HeaderInner;
