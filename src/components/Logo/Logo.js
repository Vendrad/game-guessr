import React from 'react';
import PropTypes from 'prop-types';

import styles from './Logo.module.scss';

const Logo = ({playing, restartButtonWasClicked}) => {

  let logoClasses = [/*styles.Logo,*/ styles.open];
  if (playing) logoClasses = [/*styles.Logo, */styles.closed];

  return (
    <>
      <div
        className={logoClasses.join(' ')}
        onClick={restartButtonWasClicked}>
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
  restartButtonWasClicked: PropTypes.func.isRequired
};

export default Logo;