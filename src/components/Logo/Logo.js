import React from 'react';
import PropTypes from 'prop-types';

import styles from './Logo.module.scss';

const Logo = ({ playing, restartButtonWasClicked }) => {
  let logoClasses = [styles.open];
  if (playing) logoClasses = [styles.closed];

  return (
    <>
      <div
        role="menuitem"
        tabIndex={0}
        className={logoClasses.join(' ')}
        onClick={restartButtonWasClicked}
        onKeyPress={() => {}}
      >
        <span className={styles.LogoLargeText}>G</span>
        <span className={styles.LogoSmallText}>ame</span>
        <span className={styles.LogoLargeText}>G</span>
        <span className={styles.LogoSmallText}>uessr</span>
      </div>
    </>
  );
};

Logo.propTypes = {
  playing: PropTypes.bool.isRequired,
  restartButtonWasClicked: PropTypes.func.isRequired,
};

export default Logo;
