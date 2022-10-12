import React, { ReactNode } from 'react';
import { ArtWork, IArtWork } from './ArtWork';
import { Loader } from './Loader';

interface ArtWorksListtProps {
  data: Array<IArtWork>;
  loading: boolean;
}

export class ArtWorksList extends React.Component<ArtWorksListtProps> {
  constructor(props: ArtWorksListtProps) {
    super(props);
  }

  render(): ReactNode {
    return (
      <>
        {this.props.loading && <Loader />}

        {/* {this.props.errorMessage && <ErrorMessage errorMessage={errorMessage} />} */}

        <div className="artworks__list" data-testid="artworks-list">
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
      </>
    );
  }
}
