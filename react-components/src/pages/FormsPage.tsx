import React from 'react';
import { ReactNode } from 'react';
import { Form } from '../components/Form';

export class FormsPage extends React.Component {
  render(): ReactNode {
    return (
      <div className="form-page">
        <Form />
      </div>
    );
  }
}
