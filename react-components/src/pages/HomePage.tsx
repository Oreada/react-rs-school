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

  getData = async (): Promise<void> => {
    try {
      const response = await fetch(
        `https://api.artic.edu/api/v1/artworks/search?q=painting&query[term][is_public_domain]=true&fields=id,title,artist_title,date_display,image_id&page=1&limit=10`
      );
      if (!response.ok) {
        throw new Error(`Request failed with status code ${response.status}`);
      }
      const respJson = await response.json();
      const artWorksList = respJson.data;
      //console.log('artWorksList', artWorksList);
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
  };

  async componentDidMount() {
    await this.getData();
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
