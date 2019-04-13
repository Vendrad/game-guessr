import React from 'react';
import PropTypes from 'prop-types';

import styles from './Logo.module.scss';

/**
 * Renders the GG text logo
 *
 * Has two states, open and closed. On clicking files restart
 * App callback.
 */
const Logo = ({ started, restartButtonWasClicked }) => {
  const logoClasses = started ? [styles.closed] : [styles.open];

  return (
    <>
      <div
        role="link"
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
  started: PropTypes.bool.isRequired,
  restartButtonWasClicked: PropTypes.func.isRequired,
};

export default Logo;
