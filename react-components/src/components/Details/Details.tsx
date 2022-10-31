import React from 'react';
import { Link } from 'react-router-dom';
import { getImagePath } from '../../api/helpers';
import { IArtWorkData } from '../../pages/HomePage/HomePage';
import styles from './Details.module.css';

export interface IDetails {
  data: IArtWorkData | null;
}

export function Details(props: IDetails) {
  const imagePath = getImagePath(props.data?.image_id as string);

  return (
    <div className={styles['details']} data-testid="details">
      <div className={styles['details__box']}>
        <div className={styles['details__picture']}>
          <img src={imagePath} alt="ArtWork" className={styles['details__image']} />
        </div>
        <div className={styles['details__info']}>
          <div className={styles['details__header']}>Title of the artwork:</div>
          <div className={styles['details__item']}>&quot;{props.data?.title as string}&quot;</div>
          <div className={styles['details__header']}>Name of the author: </div>
          <div className={styles['details__item_artist']}>{props.data?.artist_title as string}</div>
          <div className={styles['details__header']}>Time of creation:</div>
          <div className={styles['details__item']}>{props.data?.date_display as string}</div>
          <div className={styles['details__header']}>The kind of work:</div>
          <div className={styles['details__item']}>{props.data?.artwork_type_title as string}</div>
          <div className={styles['details__header']}>Dimensions of the work:</div>
          <div className={styles['details__item']}>{props.data?.dimensions as string}</div>
          <div className={styles['details__header']}>Author&apos;s description:</div>
          <div className={styles['details__item']}>{props.data?.artist_display as string}</div>
        </div>
      </div>

      <Link to={'/'} className={styles['details__back']}></Link>
    </div>
  );
}
