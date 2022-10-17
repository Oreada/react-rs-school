import React, { ReactNode } from 'react';
import styles from './ErrorMessage.module.css';

interface ErrorMessageProps {
  errorMessage: string;
}

export class ErrorMessage extends React.Component<ErrorMessageProps> {
  render(): ReactNode {
    return (
      <div className={styles['error-message']} data-testid="error-message">
        {this.props.errorMessage}
      </div>
    );
  }
}
