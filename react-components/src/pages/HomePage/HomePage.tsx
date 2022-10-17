import React from 'react';
import { ReactNode } from 'react';
import { ArtWorksList } from '../../components/ArtWorksList/ArtWorksList';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import { getData } from '../../api/getData';

export interface IArtWorkData {
  id: number;
  image_id: string;
  artist_title: string;
  date_display: string;
  title: string;
}

interface HomePageState {
  dataList: Array<IArtWorkData>;
  loading: boolean;
  errorMessage: string;
}

export class HomePage extends React.Component<Record<string, never>, HomePageState> {
  state = {
    dataList: [],
    loading: true,
    errorMessage: '',
  };

  changeHomePageState = (
    newList: Array<IArtWorkData>,
    newLoading: boolean,
    newErrorMessage: string
  ) => {
    this.setState({
      dataList: newList,
      loading: newLoading,
      errorMessage: newErrorMessage,
    });
  };

  async componentDidMount() {
    try {
      const artWorksList = await getData();
      this.setState({
        dataList: artWorksList as Array<IArtWorkData>,
        loading: false,
        errorMessage: '',
      });
    } catch (e: unknown) {
      const err = e as Error;
      this.setState({
        dataList: [],
        loading: false,
        errorMessage: err.message,
      });
    }
  }

  render(): ReactNode {
    return (
      <main className="home-page" data-testid="home-page">
        <SearchBar changeHomePageState={this.changeHomePageState} />
        <ArtWorksList
          data={this.state.dataList}
          loading={this.state.loading}
          errorMessage={this.state.errorMessage}
        />
      </main>
    );
  }
}
