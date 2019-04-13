import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';

/**
 * Renders a flyaway
 *
 * A simple component to wrap content in a transition that
 * automatically chains to exiting after it has finished
 * entering. Useful for UI flare and quick user feedback.
 */
class Flyaway extends Component {
  state = {
    inState: false,
  };

  /**
   * Immediately set inState to true so that CSSTransition
   * will control the entering and rendering of the children
   */
  componentDidMount() {
    this.setState({ inState: true });
  }

  /**
   * Called once CSSTransition has finished entering
   * (onEntered) and sets the inState back to false so
   * that CSSTransition immediately starts exiting
   */
  chainExit = () => {
    this.setState({ inState: false });
  };

  render() {
    const {
      styles, animationStyles, timeout, cleanup, children,
    } = this.props;

    const { inState } = this.state;

    return (
      <CSSTransition
        in={inState}
        unmountOnExit
        timeout={timeout}
        className={styles}
        classNames={animationStyles}
        onEntered={this.chainExit}
        onExited={cleanup}
      >
        {children}
      </CSSTransition>
    );
  }
}

Flyaway.defaultProps = {
  timeout: { appear: 500, enter: 500, exit: 500 },
  cleanup: () => {},
};

Flyaway.propTypes = {
  styles: PropTypes.string.isRequired,
  animationStyles: PropTypes.instanceOf(Object).isRequired,
  timeout: PropTypes.instanceOf(Object),
  cleanup: PropTypes.func,
  children: PropTypes.instanceOf(Object).isRequired,
};

export default Flyaway;
