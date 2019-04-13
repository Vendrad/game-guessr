import React from 'react';
import PropTypes from 'prop-types';

import HeaderInner from './HeaderInner/HeaderInner';

import styles from './Header.module.scss';
import backgroundImage from '../../assets/images/bg2.jpg';

/**
 * Opening page and Header
 *
 * This wraps the header content so that it can animate between
 * two modes, open and closed. When open a footer is rendered too.
 */
const Header = ({
  started,
  startButtonWasClicked,
  restartButtonWasClicked,
}) => {
  const headerClasses = started
    ? [styles.Header, styles.closed]
    : [styles.Header, styles.open];

  return (
    <header
      className={headerClasses.join(' ')}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <HeaderInner
        started={started}
        startButtonWasClicked={startButtonWasClicked}
        restartButtonWasClicked={restartButtonWasClicked}
      />
      {!started && (
        <div className={styles.Footer}>
          Created by Dane Shenton. Powered by
          {' '}
          <a href="https://IGDB.com">IGDB.com</a>
        </div>
      )}
    </header>
  );
};

Header.propTypes = {
  started: PropTypes.bool.isRequired,
  startButtonWasClicked: PropTypes.func.isRequired,
  restartButtonWasClicked: PropTypes.func.isRequired,
};

export default Header;
