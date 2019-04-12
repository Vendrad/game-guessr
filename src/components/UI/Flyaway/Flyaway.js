import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';

class Flyaway extends Component {
  state = {
    inState: false,
  };

  componentDidMount() {
    this.setState({ inState: true });
  }

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
