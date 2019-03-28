import React from 'react';

import styles from './withTransitionIn.module.css';

const withTransitionIn = WrappedComponent => {
  return props => (
    <div className={styles.transitionIn}>
      <WrappedComponent {...props}/>
    </div>
  );
};

export default withTransitionIn;