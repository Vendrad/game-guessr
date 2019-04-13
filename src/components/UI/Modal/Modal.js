import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';

import styles from './Modal.module.scss';

/**
 * Wrap content in a modal
 *
 * Accepts toggles for automatic closing and/or close button.
 * Uses CSSTransition to handle animation and events at each state.
 */
class Modal extends Component {
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
   * When triggered puts the inState to false so that
   * CSSTransition will start exiting the components children
   */
  closeModalHandler = () => {
    this.setState({ inState: false });
  };

  render() {
    const {
      automaticallyExit,
      displayCloseButton,
      modalExitedCallback,
      extraStyles,
      children,
    } = this.props;

    const { inState } = this.state;

    return (
      <CSSTransition
        in={inState}
        timeout={{
          appear: 0,
          enter: 2000,
          exit: 500,
        }}
        unmountOnExit
        onEntered={automaticallyExit ? this.closeModalHandler : null}
        onExited={modalExitedCallback}
        classNames={{
          enter: styles.modalEnter,
          enterActive: styles.modalEnterActive,
          exit: styles.modalExit,
          exitActive: styles.modalExitActive,
        }}
      >
        <div className={styles.ModalWrapper}>
          <div className={[extraStyles, styles.Modal].join(' ')}>
            {children}
            {displayCloseButton && (
              <button
                type="button"
                className={styles.ModalCloseButton}
                onClick={this.closeModalHandler}
                onKeyPress={this.closeModalHandler}
                aria-label="Close Modal"
              >
                &times;
              </button>
            )}
          </div>
        </div>
      </CSSTransition>
    );
  }
}

Modal.defaultProps = {
  automaticallyExit: true,
  displayCloseButton: false,
  children: null,
  modalExitedCallback: () => {},
  extraStyles: '',
};

Modal.propTypes = {
  automaticallyExit: PropTypes.bool,
  displayCloseButton: PropTypes.bool,
  modalExitedCallback: PropTypes.func,
  extraStyles: PropTypes.string,
  children: PropTypes.instanceOf(Object),
};

export default Modal;
