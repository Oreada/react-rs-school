import React from 'react';
import styles from './Card.module.css';

export interface ICard {
  name: string;
  phone: string;
  adress: string;
  delivery: string;
  payment: string;
}

export function Card(props: ICard) {
  return (
    <div className={styles['card']} data-testid="card">
      <p className={styles['card__item']}>Name: {props.name}</p>
      <p className={styles['card__item']}>Phone number: {props.phone}</p>
      <p className={styles['card__item']}>Adress: {props.adress}</p>
      <p className={styles['card__item']}>Delivery method: {props.delivery}</p>
      <p className={styles['card__item']}>Payment option: {props.payment}</p>
    </div>
  );
}
