import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';

import styles from './Modal.module.scss';

class Modal extends Component {
  state = {
    inState: false,
  };

  componentDidMount() {
    this.setState({ inState: true });
  }

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
