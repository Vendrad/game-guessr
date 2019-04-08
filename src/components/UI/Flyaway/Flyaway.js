import React, { useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';

const Flyaway = ({styles, animationStyles, timeout, cleanup, children}) => {

  const [inState, inStateSetter] = useState(false);

  useEffect(() => {
    inStateSetter(true);
  }, []);

  const chainExit = () => {
    inStateSetter(false);
  }

  return (
    <CSSTransition
      in={inState}
      unmountOnExit
      timeout={timeout}
      className={styles}
      classNames={animationStyles}
      onEntered={chainExit}
      onExited={cleanup}>
      {children}
    </CSSTransition>
  )
};

Flyaway.defaultProps = {
  timeout: {appear: 500, enter: 500, exit: 500}
};

Flyaway.propTypes = {
  styles: PropTypes.string.isRequired,
  animationStyles: PropTypes.instanceOf(Object),
  timeout: PropTypes.instanceOf(Object),
  cleanup: PropTypes.func, 
  children: PropTypes.instanceOf(Object)
}

export default Flyaway;