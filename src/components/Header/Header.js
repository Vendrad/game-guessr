import React from 'react';
import PropTypes from 'prop-types';

import HeaderInner from './HeaderInner/HeaderInner';

import styles from './Header.module.scss';
import backgroundImage from '../../assets/images/bg2.jpg';

const Header = ({
  started,
  startButtonWasClicked,
  restartButtonWasClicked,
}) => {
  let headerClasses = [styles.Header, styles.open];
  if (started) headerClasses = [styles.Header, styles.closed];

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
