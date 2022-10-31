import React from 'react';
import { IArtWorkData } from '../../pages/HomePage/HomePage';
import { ArtWork } from '../ArtWork/ArtWork';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { Loader } from '../Loader/Loader';
import styles from './ArtWorksList.module.css';

interface ArtWorksListProps {
  data: Array<IArtWorkData>;
  loading: boolean;
  errorMessage: string;
}

export function ArtWorksList(props: ArtWorksListProps) {
  return (
    <ul className={styles['artworks__list']} data-testid="artworks-list">
      {props.loading && <Loader />}

      {props.errorMessage && <ErrorMessage errorMessage={props.errorMessage} />}

      {(props.data as Array<IArtWorkData>).map((item: IArtWorkData) => (
        <ArtWork
          key={item.id}
          id={item.id}
          image_id={item.image_id}
          artist_title={item.artist_title}
          date_display={item.date_display}
          title={item.title}
        />
      ))}
    </ul>
  );
}
