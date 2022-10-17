import React, { ReactNode } from 'react';
import { searchData } from '../../api/searchData';
import { IArtWorkData } from '../../pages/HomePage/HomePage';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  changeHomePageState: (
    newList: Array<IArtWorkData>,
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
      const artWorksList = await searchData(this.state.value);
      this.props.changeHomePageState(artWorksList as Array<IArtWorkData>, false, '');
    } catch (e: unknown) {
      const err = e as Error;
      this.props.changeHomePageState([], false, err.message);
    }
  };

  render(): ReactNode {
    return (
      <form
        role="search"
        method="get"
        className={styles['search-form']}
        action=""
        data-testid="form-search"
      >
        <label className={styles['search-form-label']}>
          <span className={styles['screen-reader-text']}>Search for...</span>
          <input
            type="search"
            className={styles['search-field']}
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
          className={styles['search-submit']}
          value=""
          onClick={this.searchHandler}
          data-testid="input-submit"
        />
      </form>
    );
  }
}
