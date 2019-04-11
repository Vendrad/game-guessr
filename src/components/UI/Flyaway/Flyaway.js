import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';

export class Flyaway extends Component {

  state = {
    in: false
  }

  componentDidMount () {
    this.setState({in: true});
  }

  chainExit = () => {
    this.setState({in: false});
  }

  render () {

    const { styles, animationStyles, timeout, cleanup, children } = this.props;

    return (
      <CSSTransition
        in={this.state.in}
        unmountOnExit
        timeout={timeout}
        className={styles}
        classNames={animationStyles}
        onEntered={this.chainExit}
        onExited={cleanup}>
        {children}
      </CSSTransition>
    )
  }
}

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