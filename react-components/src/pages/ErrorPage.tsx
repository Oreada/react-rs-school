import React from 'react';
import { ReactNode } from 'react';

export class ErrorPage extends React.Component {
  render(): ReactNode {
    return <main className="error">Error 404. Page was not found</main>;
  }
}
