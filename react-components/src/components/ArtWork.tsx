import React, { ReactNode } from 'react';
import { IDetailsData } from './ArtWorksList';
import { getImagePath } from '../api/helpers';
import { getDetails } from '../api/getDetails';

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
      <li className="artwork" data-testid="artwork">
        <div className="artwork__box">
          <div className="artwork__picture">
            <img src={imagePath} alt="ArtWork" className="artwork__image" />
          </div>
          <div className="artwork__info info">
            <div className="info__item info__item_title">&quot;{this.props.title}&quot;</div>
            <div className="info__item info__item_artist">{this.props.artist_title}</div>
            <div className="info__item info__date">{this.props.date_display}</div>
          </div>
          <button
            className="artwork__button"
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
