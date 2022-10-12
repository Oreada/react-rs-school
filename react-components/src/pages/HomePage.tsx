import React from 'react';
import { ReactNode } from 'react';
import { IArtWork } from '../components/ArtWork';
import { ArtWorksList } from '../components/ArtWorksList';
import { SearchBar } from '../components/SearchBar';

interface HomePageState {
  dataList: Array<IArtWork>;
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
    newList: Array<IArtWork>,
    newLoading: boolean,
    newErrorMessage: string
  ) => {
    this.setState({
      dataList: newList,
      loading: newLoading,
      errorMessage: newErrorMessage,
    });
  };

  async componentDidMount(): Promise<void> {
    try {
      const response = await fetch(
        `https://api.artic.edu/api/v1/artworks?fields=id,title,artist_title,date_display,artwork_type_title,dimensions,artist_display,image_id&page=1&limit=10`
      );
      const artWorksList = (await response.json()).data;
      console.log(artWorksList);
      this.setState({
        dataList: artWorksList,
        loading: false,
        errorMessage: '',
      });
    } catch (e: unknown) {
      const err = e as Error;
      console.log(err.message);
      this.setState({
        dataList: [],
        loading: false,
        errorMessage: err.message,
      });
    }
  }

  render(): ReactNode {
    return (
      <main className="home-page">
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
