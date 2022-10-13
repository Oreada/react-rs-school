import React, { ReactNode } from 'react';
import { getImagePath } from './ArtWork';
import { IDetailsData } from './ArtWorksList';

export interface IDetails {
  data: IDetailsData | null;
}

export class Details extends React.Component<IDetails> {
  render(): ReactNode {
    const imagePath = getImagePath(this.props.data?.image_id as string);

    return (
      <div className="details" data-testid="details">
        <div className="details__box">
          <div className="details__picture">
            <img src={imagePath} alt="ArtWork" className="details__image" />
          </div>
          <div className="details__info">
            <div className="details__header">Title of the artwork:</div>
            <div className="details__item">&quot;{this.props.data?.title as string}&quot;</div>
            <div className="details__header">Name of the author: </div>
            <div className="details__item info__item_artist">
              {this.props.data?.artist_title as string}
            </div>
            <div className="details__header">Time of creation:</div>
            <div className="details__item">{this.props.data?.date_display as string}</div>
            <div className="details__header">The kind of work:</div>
            <div className="details__item">{this.props.data?.artwork_type_title as string}</div>
            <div className="details__header">Dimensions of the work:</div>
            <div className="details__item">{this.props.data?.dimensions as string}</div>
            <div className="details__header">Author&apos;s description:</div>
            <div className="details__item">{this.props.data?.artist_display as string}</div>
          </div>
        </div>
      </div>
    );
  }
}
