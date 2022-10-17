import React, { ReactNode } from 'react';
import { IArtWorkData } from '../../pages/HomePage/HomePage';
import { ArtWork } from '../ArtWork/ArtWork';
import { Details } from '../Details/Details';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { Loader } from '../Loader/Loader';
import { Modal } from '../Modal/Modal';

export interface IDetailsData {
  id: number;
  image_id: string;
  artist_display: string;
  artist_title: string;
  artwork_type_title: string;
  date_display: string;
  dimensions: string;
  title: string;
}

interface ArtWorksListProps {
  data: Array<IArtWorkData>;
  loading: boolean;
  errorMessage: string;
}

interface ArtWorksListState {
  modal: boolean;
  details: IDetailsData | null;
  loadingDetails: boolean;
}

export class ArtWorksList extends React.Component<ArtWorksListProps, ArtWorksListState> {
  constructor(props: ArtWorksListProps) {
    super(props);
  }

  state = {
    modal: false,
    details: null,
    loadingDetails: true,
  };

  changeModalState = (newModal: boolean) => {
    this.setState({
      modal: newModal, //! нужно менять на фолс при клике на область модального окна и менять на тру при клике на карточку
    });
    console.log('changeModalState works');
  };

  changeDetailsState = (dataDetails: IDetailsData | null, loadingDetails: boolean) => {
    this.setState({
      details: dataDetails,
      loadingDetails: loadingDetails,
    });
    console.log('changeDetailsState works');
  };

  render(): ReactNode {
    return (
      <ul className="artworks__list" data-testid="artworks-list">
        {this.props.loading && <Loader />}

        {this.props.errorMessage && <ErrorMessage errorMessage={this.props.errorMessage} />}

        {(this.props.data as Array<IArtWorkData>).map((item: IArtWorkData) => (
          <ArtWork
            key={item.id}
            id={item.id}
            image_id={item.image_id}
            artist_title={item.artist_title}
            date_display={item.date_display}
            title={item.title}
            onClick={this.changeModalState}
            forDetails={this.changeDetailsState}
          />
        ))}

        {this.state.modal && (
          <Modal title="Details of artwork" onClose={this.changeModalState}>
            {this.state.loadingDetails && <Loader />}

            {!this.state.loadingDetails && <Details data={this.state.details} />}
          </Modal>
        )}
      </ul>
    );
  }
}
