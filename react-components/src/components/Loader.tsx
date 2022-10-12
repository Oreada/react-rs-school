import React, { ReactNode } from 'react';

export class Loader extends React.Component {
  render(): ReactNode {
    return (
      <div className="preload">
        <div className="preload__bg"></div>
      </div>
    );
  }
}
