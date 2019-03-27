import React from 'react';
import PropTypes from 'prop-types';

import HeaderInner from './HeaderInner/HeaderInner';

import styles from './Header.module.scss';
import backgroundImage from '../../assets/images/bg.jpg';

const Header = props => {

  let headerClasses = [styles.Header, styles.open];
  if (props.playing) headerClasses = [styles.Header, styles.closed];

  return (
    <header className={headerClasses.join(' ')} style={{backgroundImage: "url(" + backgroundImage +")"}}>
      <HeaderInner
        score={props.score}
        playing={props.playing}
        startButtonWasClicked={props.startButtonWasClicked}
        restartButtonWasClicked={props.restartButtonWasClicked} />
      {!props.playing ? <div className={styles.Footer}>Created by Dane Shenton. Powered by <a href="https://IGDB.com">IGDB.com</a></div> : null}
    </header>
  );
};

Header.propTypes = {
  score: PropTypes.number.isRequired,
  playing: PropTypes.bool.isRequired,
  startButtonWasClicked: PropTypes.func.isRequired,
  restartButtonWasClicked: PropTypes.func.isRequired
}

export default Header;