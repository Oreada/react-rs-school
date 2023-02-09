import React from 'react';
import { IArtWorkData } from '../../pages/HomePage/HomePage';
import { ArtWork } from '../ArtWork/ArtWork';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { Loader } from '../Loader/Loader';
import { useAppSelector } from '../../store/hook';
import styles from './ArtWorksList.module.css';

interface ArtWorksListProps {
  data: Array<IArtWorkData>;
}

export function ArtWorksList(props: ArtWorksListProps) {
  const loader = useAppSelector((state) => state.homePageArtworks.loading); //! так достаём данные из redux store
  const errorMessage = useAppSelector((state) => state.homePageArtworks.error);

  return (
    <ul className={styles['artworks__list']} data-testid="artworks-list">
      {loader && <Loader />}

      {errorMessage && <ErrorMessage errorMessage={errorMessage} />}

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
