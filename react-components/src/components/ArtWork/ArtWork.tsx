import React, { ReactNode } from 'react';
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

export class ArtWork extends React.Component<IArtWork> {
  constructor(props: IArtWork) {
    super(props);
  }

  clickHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
    this.props.onClick(true);
    const id = Number((event.target as HTMLButtonElement).dataset.id);

    try {
      this.props.forDetails(null, true);
      const artWorkDetails = await getDetails(id);
      this.props.forDetails(artWorkDetails as IDetailsData, false);
    } catch (e: unknown) {
      const err = e as Error;
      console.log(err.message); //! тут не вывожу сообщение об ошибке пользователю
    }
  };

  render(): ReactNode {
    const imagePath = getImagePath(this.props.image_id);

    return (
      <li className={styles['artwork']} data-testid="artwork">
        <div className={styles['artwork__box']}>
          <div className={styles['artwork__picture']}>
            <img src={imagePath} alt="ArtWork" className={styles['artwork__image']} />
          </div>
          <div className={styles['artwork__info']}>
            <div className={styles['info__item_title']}>&quot;{this.props.title}&quot;</div>
            <div className={styles['info__item_artist']}>{this.props.artist_title}</div>
            <div className={styles['info__item_date']}>{this.props.date_display}</div>
          </div>
          <button
            className={styles['artwork__button']}
            onClick={this.clickHandler}
            data-id={this.props.id}
            data-testid="artwork-button"
          >
            Read more
          </button>
        </div>
      </li>
    );
  }
}
