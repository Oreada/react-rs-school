import React, { ReactNode } from 'react';

export interface ICard {
  name: string;
  phone: string;
  adress: string;
  delivery: string;
  payment: string;
}

export class Card extends React.Component<ICard> {
  constructor(props: ICard) {
    super(props);
  }

  render(): ReactNode {
    return (
      <div className="form-card card" data-testid="card">
        <p className="card__item">Name: {this.props.name}</p>
        <p className="card__item">Phone number: {this.props.phone}</p>
        <p className="card__item">Adress: {this.props.adress}</p>
        <p className="card__item">Delivery method: {this.props.delivery}</p>
        <p className="card__item">Payment option: {this.props.payment}</p>
      </div>
    );
  }
}
