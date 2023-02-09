import React from 'react';
import { useAppSelector } from '../../store/hook';
import { store } from '../../store';
import styles from './SearchBar.module.css';
import { setSearch } from '../../store/searchSlice';
import { getData, setPageCurrent } from '../../store/homePageArtworksSlice';

export function SearchBar() {
  const searchValue = useAppSelector((state) => state.search.value); //! так достаём данные из redux store
  const objForSorting = useAppSelector((state) => state.objForSorting.obj);
  const limitValue = useAppSelector((state) => state.limit.value);

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    store.dispatch(setSearch(event.target.value));
  };

  const searchHandler = async (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    event.preventDefault();

    store.dispatch(setPageCurrent('1')); //! сбиваю текущую страницу, т.к. изменяется общее количество страниц
    store.dispatch(
      getData({ value: searchValue, limit: limitValue, obj: objForSorting, page: '1' })
    );
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
          placeholder="Input something: 'Raphael', 'Gogh', 'rabbit'..."
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
