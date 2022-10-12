import React, { ReactNode } from 'react';
import { getImagePath } from './SearchBar';

export interface IArtWork {
  id?: number; //! использую только для key
  image_id: string;
  artist_display: string;
  artist_title: string;
  artwork_type_title: string;
  date_display: string;
  dimensions: string;
  title: string;
}

export class ArtWork extends React.Component<IArtWork> {
  constructor(props: IArtWork) {
    super(props);
  }

  render(): ReactNode {
    const imagePath = getImagePath(this.props.image_id);

    return (
      <div className="product" data-testid="product">
        <div className="product__box">
          <div className="product__picture">
            <img src={imagePath} alt="ArtWork" className="product__image" />
          </div>
          <div className="product__info info">
            <div className="info__item">{this.props.title}</div>
            <div className="info__item">{this.props.artist_title}</div>
            <div className="info__item">{this.props.date_display}</div>
            <div className="info__item">{this.props.artwork_type_title}</div>
            <div className="info__item">{this.props.dimensions}</div>
            <div className="info__item">{this.props.artist_display}</div>
          </div>
        </div>
      </div>
    );
  }
}
