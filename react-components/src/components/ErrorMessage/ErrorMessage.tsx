import React, { ReactNode } from 'react';

interface ErrorMessageProps {
  errorMessage: string;
}

export class ErrorMessage extends React.Component<ErrorMessageProps> {
  render(): ReactNode {
    return (
      <div className="error-message" data-testid="error-message">
        {this.props.errorMessage}
      </div>
    );
  }
}
