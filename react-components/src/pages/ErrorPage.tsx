import React from 'react';
import { ReactNode } from 'react';

export class ErrorPage extends React.Component {
  render(): ReactNode {
    return (
      <main className="error-page" data-testid="error-page">
        Error 404. Page was not found
      </main>
    );
  }
}
