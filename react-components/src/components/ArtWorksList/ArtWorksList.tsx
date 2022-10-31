import React, { useState } from 'react';
import { IArtWorkData } from '../../pages/HomePage/HomePage';
import { ArtWork } from '../ArtWork/ArtWork';
import { Details } from '../Details/Details';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { Loader } from '../Loader/Loader';
import { Modal } from '../Modal/Modal';
import styles from './ArtWorksList.module.css';

interface ArtWorksListProps {
  data: Array<IArtWorkData>;
  loading: boolean;
  errorMessage: string;
}

interface ArtWorksListState {
  modal: boolean;
  details: IArtWorkData | null;
  loadingDetails: boolean;
}

export function ArtWorksList(props: ArtWorksListProps) {
  const [listState, setListState] = useState<ArtWorksListState>({
    modal: false,
    details: null,
    loadingDetails: true,
  });

  const changeModalState = (newModal: boolean) => {
    setListState((prev) => {
      return {
        modal: newModal, //! нужно менять на фолс при клике на область модального окна и менять на тру при клике на карточку
        details: prev.details,
        loadingDetails: prev.loadingDetails,
      };
    });
    console.log('changeModalState works');
  };

  const changeDetailsState = (dataDetails: IArtWorkData | null, loadingDetails: boolean) => {
    setListState((prev) => {
      return {
        modal: prev.modal, //! нужно менять на фолс при клике на область модального окна и менять на тру при клике на карточку
        details: dataDetails,
        loadingDetails: loadingDetails,
      };
    });
    console.log('changeDetailsState works');
  };

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
          onClick={changeModalState}
          forDetails={changeDetailsState}
        />
      ))}

      {listState.modal && (
        <Modal title="Details of artwork" onClose={changeModalState}>
          {listState.loadingDetails && <Loader />}

          {!listState.loadingDetails && <Details data={listState.details} />}
        </Modal>
      )}
    </ul>
  );
}
