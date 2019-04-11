import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';

import styles from './Modal.module.scss';

export class Modal extends Component {

  state = {
    in: false
  }

  componentDidMount () {
    this.setState({in: true});
  }

  closeModalHandler = () => {
    this.setState({in: false});
  }

  render () {
    
    const {automaticallyExit, displayCloseButton, modalExitedCallback,
      extraStyles, children} = this.props;

    return (
      <CSSTransition
        in={this.state.in}
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
          exitActive: styles.modalExitActive
        }} >
        <div className={styles.ModalWrapper}>
          <div className={[extraStyles, styles.Modal].join(" ")} onClick={null}>
            {children}
            {displayCloseButton && <div className={styles.ModalCloseButton} onClick={this.closeModalHandler} aria-label="Close Modal">&times;</div>}
          </div>
        </div>
      </CSSTransition>
    )
  }
  
}

Modal.defaultProps = {
  automaticallyExit: true,
  displayCloseButton: false
};

Modal.propTypes = {
  automaticallyExit: PropTypes.bool,
  displayCloseButton: PropTypes.bool,
  modalExitedCallback: PropTypes.func,
  extraStyles: PropTypes.string
};

export default Modal;