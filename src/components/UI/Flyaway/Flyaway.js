import React, { useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';

const Flyaway = props => {
  const [inState, inStateSetter] = useState(false);

  useEffect(() => {
    inStateSetter(true);
  }, []);

  const chainExit = () => {
    inStateSetter(false);
  }

  let timeout = props.timeout !== null ? props.timeout : 500;

  return (
    <CSSTransition
      in={inState}
      unmountOnExit
      timeout={timeout}
      className={props.styles}
      classNames={props.animationStyles}
      onEntered={chainExit}
      onExited={props.cleanup}>
      {props.children}
    </CSSTransition>
  )
};

Flyaway.propTypes = {
  styles: PropTypes.string.isRequired,
  animationStyles: PropTypes.instanceOf(Object),
  timeout: PropTypes.instanceOf(Object),
  onExited: PropTypes.func
}

export default Flyaway;