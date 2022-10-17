import React, { ReactNode } from 'react';
import styles from './Loader.module.css';

export class Loader extends React.Component {
  render(): ReactNode {
    return (
      <div className={styles['preload']}>
        <div className={styles['preload__bg']}></div>
      </div>
    );
  }
}
