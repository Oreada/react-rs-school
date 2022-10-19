import React from 'react';
import styles from './ErrorMessage.module.css';

interface ErrorMessageProps {
  errorMessage: string;
}

export function ErrorMessage(props: ErrorMessageProps) {
  return (
    <div className={styles['error-message']} data-testid="error-message">
      {props.errorMessage}
    </div>
  );
}
