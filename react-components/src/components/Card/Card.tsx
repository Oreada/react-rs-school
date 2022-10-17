import React, { ReactNode } from 'react';
import styles from './Card.module.css';

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
      <div className={styles['card']} data-testid="card">
        <p className={styles['card__item']}>Name: {this.props.name}</p>
        <p className={styles['card__item']}>Phone number: {this.props.phone}</p>
        <p className={styles['card__item']}>Adress: {this.props.adress}</p>
        <p className={styles['card__item']}>Delivery method: {this.props.delivery}</p>
        <p className={styles['card__item']}>Payment option: {this.props.payment}</p>
      </div>
    );
  }
}
