import React, { useEffect } from 'react';
import { getSortedData } from '../../api/getSortedData';
import { useHomePageContext } from '../../context';
import { IArtWorkData } from '../../pages/HomePage/HomePage';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  changeHomePageState: (
    newList: Array<IArtWorkData>,
    newLoading: boolean,
    newErrorMessage: string
  ) => void;
}

export function SearchBar(props: SearchBarProps) {
  const { searchValue, setSearchValue } = useHomePageContext();
  // const [searchBarState, setSearchBarState] = useState('');

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  useEffect(() => {
    const storageValue = localStorage.getItem('valueSearchBar') || '';
    setSearchValue(storageValue);
  }, []);

  useEffect(() => {
    localStorage.setItem('valueSearchBar', searchValue);
  }, [searchValue]);

  const searchHandler = async (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    event.preventDefault();

    try {
      props.changeHomePageState([], true, '');
      const artWorksList = await getSortedData(searchValue, {});
      props.changeHomePageState(artWorksList as Array<IArtWorkData>, false, '');
    } catch (e: unknown) {
      const err = e as Error;
      props.changeHomePageState([], false, err.message);
    }
  };

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
          value={searchValue}
          name="search"
          onChange={changeHandler}
          data-testid="input-search"
        />
      </label>
      <input
        type="submit"
        className={styles['search-submit']}
        value=""
        onClick={searchHandler}
        data-testid="input-submit"
      />
    </form>
  );
}
