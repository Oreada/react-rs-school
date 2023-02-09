import React from 'react';
import styles from './Loader.module.css';

export function Loader() {
  return (
    <div className={styles['preload']}>
      <div className={styles['preload__bg']}></div>
    </div>
  );
}
