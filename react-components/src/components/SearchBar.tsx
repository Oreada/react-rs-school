import React, { ReactNode } from 'react';
import { IArtWork } from './ArtWork';

interface SearchBarProps {
  changeHomePageState: (
    newList: Array<IArtWork>,
    newLoading: boolean,
    newErrorMessage: string
  ) => void;
}

interface SearchBarState {
  value: string;
}

export class SearchBar extends React.Component<SearchBarProps, SearchBarState> {
  constructor(props: SearchBarProps) {
    super(props);
    this.state = { value: '' };
  }

  changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ value: event.target.value });
  };

  componentDidMount() {
    const storageValue = localStorage.getItem('valueSearchBar') || '';
    this.setState({ value: storageValue });
  }

  componentWillUnmount() {
    localStorage.setItem('valueSearchBar', this.state.value);
  }

  searchHandler = async (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    event.preventDefault();

    try {
      this.props.changeHomePageState([], true, '');
      const response = await fetch(
        `https://api.artic.edu/api/v1/artworks/search?q=${this.state.value}&query[term][is_public_domain]=true&fields=id,title,artist_title,date_display,image_id&page=1&limit=20`
      );
      if (!response.ok) {
        throw new Error(`Request failed with status code ${response.status}`);
      }
      const respJson = await response.json();
      if (!respJson.hasOwnProperty('data')) {
        throw new Error(`Incorrect content format`);
      }
      const artWorksList = respJson.data;
      console.log(artWorksList);

      this.props.changeHomePageState(artWorksList, false, '');
    } catch (e: unknown) {
      const err = e as Error;
      console.log(err.message);
      this.props.changeHomePageState([], false, err.message);
    }
  };

  render(): ReactNode {
    return (
      <form role="search" method="get" className="search-form" action="" data-testid="form-search">
        <label>
          <span className="screen-reader-text">Search for...</span>
          <input
            type="search"
            className="search-field"
            placeholder="Input something: 'Monet', 'Gogh', 'rabbit'..."
            autoComplete="off"
            value={this.state.value}
            name="search"
            onChange={this.changeHandler}
            data-testid="input-search"
          />
        </label>
        <input
          type="submit"
          className="search-submit button"
          value=""
          onClick={this.searchHandler}
          data-testid="input-submit"
        />
      </form>
    );
  }
}
