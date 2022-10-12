import React, { ReactNode } from 'react';
import { ArtWork, IArtWork } from './ArtWork';
// import { IProduct, Product } from './Product';

interface ProductListProps {
  data: Array<IArtWork>;
}

export class ArtWorksList extends React.Component<ProductListProps> {
  constructor(props: ProductListProps) {
    super(props);
  }

  render(): ReactNode {
    return (
      <div className="products__list" data-testid="products-list">
        {(this.props.data as Array<IArtWork>).map((item: IArtWork) => (
          <ArtWork
            key={item.id}
            image_id={item.image_id}
            artist_display={item.artist_display}
            artist_title={item.artist_title}
            artwork_type_title={item.artwork_type_title}
            date_display={item.date_display}
            dimensions={item.dimensions}
            title={item.title}
          />
        ))}
      </div>
    );
  }
}
