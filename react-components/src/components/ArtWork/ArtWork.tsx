import React from 'react';
import { IDetailsData } from '../ArtWorksList/ArtWorksList';
import { getImagePath } from '../../api/helpers';
import { getDetails } from '../../api/getDetails';
import styles from './ArtWork.module.css';

export interface IArtWork {
  id: number;
  image_id: string;
  artist_title: string;
  date_display: string;
  title: string;
  onClick: (newModal: boolean) => void;
  forDetails: (dataDetails: IDetailsData | null, loadingDetails: boolean) => void;
}

export function ArtWork(props: IArtWork) {
  const clickHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
    props.onClick(true);
    const id = Number((event.target as HTMLButtonElement).dataset.id);

    try {
      props.forDetails(null, true);
      const artWorkDetails = await getDetails(id);
      props.forDetails(artWorkDetails as IDetailsData, false);
    } catch (e: unknown) {
      const err = e as Error;
      console.log(err.message); //! тут не вывожу сообщение об ошибке пользователю
    }
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
        <button
          className={styles['artwork__button']}
          onClick={clickHandler}
          data-id={props.id}
          data-testid="artwork-button"
        >
          Read more
        </button>
      </div>
    </li>
  );
}
