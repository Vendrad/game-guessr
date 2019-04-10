import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';

import styles from './Modal.module.scss';

const Modal = ({automaticallyExit, displayCloseButton, modalExitedCallback, extraStyles, children}) => {

  const [inState, inStateSetter] = useState(false);

  useEffect(() => {
    inStateSetter(true);
  },[]);

  const closeModalHandler = () => {
    inStateSetter(false);
  };

  return (
    <CSSTransition
      in={inState}
      timeout={{
        appear: 0,
        enter: 2000,
        exit: 500,
       }}
      unmountOnExit
      onEntered={automaticallyExit ? closeModalHandler : null}
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
          {displayCloseButton && <div className={styles.ModalCloseButton} onClick={closeModalHandler} aria-label="Close Modal">&times;</div>}
        </div>
      </div>
    </CSSTransition>
  )
};

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