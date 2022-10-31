import React from 'react';
import { getImagePath } from '../../api/helpers';
import styles from './ArtWork.module.css';
import { useHomePageContext } from '../../context';
import { Link } from 'react-router-dom';

export interface IArtWork {
  id: number;
  image_id: string;
  artist_title: string;
  date_display: string;
  title: string;
}

export function ArtWork(props: IArtWork) {
  const { idDetails, setIdDetails } = useHomePageContext();

  const clickHandler = async (event: React.MouseEvent<HTMLAnchorElement>) => {
    const idDetails = Number((event.target as HTMLAnchorElement).dataset.id);
    console.log(idDetails);
    setIdDetails(idDetails);
  };

  const imagePath = getImagePath(props.image_id);

  return (
    <li className={styles['artwork']} data-testid="artwork">
      <div className={styles['artwork__box']}>
        <div className={styles['artwork__picture']}>
          <img src={imagePath} alt="ArtWork" className={styles['artwork__image']} />
        </div>
        <div className={styles['artwork__info']}>
          <div className={styles['info__item_title']}>&quot;{props.title}&quot;</div>
          <div className={styles['info__item_artist']}>{props.artist_title}</div>
          <div className={styles['info__item_date']}>{props.date_display}</div>
        </div>

        <Link
          to={`/artwork/${idDetails}`}
          className={styles['artwork__button']}
          data-id={props.id}
          onClick={clickHandler}
        >
          Read more
        </Link>
      </div>
    </li>
  );
}
