import React, { ReactNode } from 'react';

interface SearchBarState {
  value: string;
}

export class SearchBar extends React.Component<Record<string, never>, SearchBarState> {
  constructor(props: Record<string, never>) {
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

  render(): ReactNode {
    return (
      <form role="search" method="get" className="search-form" action="" data-testid="form-search">
        <label>
          <span className="screen-reader-text">Search for...</span>
          <input
            type="search"
            className="search-field"
            placeholder="Search..."
            autoComplete="off"
            value={this.state.value}
            name="search"
            onChange={this.changeHandler}
            data-testid="input-search"
          />
        </label>
        <input type="submit" className="search-submit button" value="" />
      </form>
    );
  }
}
