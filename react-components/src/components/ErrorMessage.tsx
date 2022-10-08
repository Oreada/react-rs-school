import React, { ReactNode } from 'react';

interface ErrorMessageProps {
  errorMessage: string;
}

export class ErrorMessage extends React.Component<ErrorMessageProps> {
  render(): ReactNode {
    return <div className="text-center text-xl text-red-800">{this.props.errorMessage}</div>;
  }
}
