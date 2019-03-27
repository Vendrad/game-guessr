import React from 'react';
import PropTypes from 'prop-types';

import styles from './Logo.module.scss';

const Logo = props => {

  let logoClasses = [/*styles.Logo,*/ styles.open];
  if (props.playing) logoClasses = [/*styles.Logo, */styles.closed];

  return (
    <>
      <div
        className={logoClasses.join(' ')}
        onClick={props.restartButtonWasClicked}>
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