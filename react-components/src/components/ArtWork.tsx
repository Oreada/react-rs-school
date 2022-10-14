import React, { ReactNode } from 'react';
import { IDetailsData } from './ArtWorksList';

export function getImagePath(imageId: string) {
  if (imageId) {
    return `https://www.artic.edu/iiif/2/${imageId}/full/843,/0/default.jpg`;
  } else {
    return './images/no-image-available.png';
  }
}

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

  getDetails = async (idArtWork: number) => {
    try {
      this.props.forDetails(null, true);
      const response = await fetch(
        `https://api.artic.edu/api/v1/artworks/${idArtWork}?query[term][is_public_domain]=true&fields=id,title,artist_title,date_display,artwork_type_title,dimensions,artist_display,image_id&page=1&limit=20`
      );
      const artWork = (await response.json()).data;
      this.props.forDetails(artWork, false);
      console.log(artWork);
    } catch (e: unknown) {
      const err = e as Error;
      console.log(err.message);
    }
  };

  clickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    this.props.onClick(true);
    const id = Number((event.target as HTMLButtonElement).dataset.id);
    this.getDetails(id);
  };

  render(): ReactNode {
    const imagePath = getImagePath(this.props.image_id);

    return (
      <div className="artwork" data-testid="artwork">
        <div className="artwork__box">
          <div className="artwork__picture">
            <img src={imagePath} alt="ArtWork" className="artwork__image" />
          </div>
          <div className="artwork__info info">
            <div className="info__item info__item_title">&quot;{this.props.title}&quot;</div>
            <div className="info__item info__item_artist">{this.props.artist_title}</div>
            <div className="info__item info__date">{this.props.date_display}</div>
          </div>
          <button className="artwork__button" onClick={this.clickHandler} data-id={this.props.id}>
            Read more
          </button>
        </div>
      </div>
    );
  }
}
