import React from 'react';
import { ReactNode } from 'react';

export class AboutPage extends React.Component {
  render(): ReactNode {
    return (
      <main className="about-page" data-testid="about-page">
        This is the About page
      </main>
    );
  }
}
