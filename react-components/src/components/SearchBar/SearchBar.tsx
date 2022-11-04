import React, { useEffect } from 'react';
import { getSortedData } from '../../api/getSortedData';
import { IArtWorkData } from '../../pages/HomePage/HomePage';
import { useAppSelector } from '../../store/hook';
import { store } from '../../store';
import styles from './SearchBar.module.css';
import { setSearch } from '../../store/searchSlice';
import { setPageTotal, setPageCurrent } from '../../store/paginationSlice';

interface SearchBarProps {
  changeHomePageState: (
    newList: Array<IArtWorkData>,
    newLoading: boolean,
    newErrorMessage: string
  ) => void;
}

export function SearchBar(props: SearchBarProps) {
  const searchValue = useAppSelector((state) => state.search.value); //! так достаём данные из redux store
  const objForSorting = useAppSelector((state) => state.objForSorting.obj);
  const limitValue = useAppSelector((state) => state.limit.value);

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    store.dispatch(setSearch(event.target.value));
  };

  useEffect(() => {
    const storageValue = localStorage.getItem('valueSearchBar') || '';
    store.dispatch(setSearch(storageValue));
  }, []);

  useEffect(() => {
    localStorage.setItem('valueSearchBar', searchValue);
  }, [searchValue]);

  const searchHandler = async (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    event.preventDefault();

    try {
      props.changeHomePageState([], true, '');
      const result = await getSortedData(searchValue, limitValue, objForSorting, '1');
      props.changeHomePageState(result?.artWorksList as Array<IArtWorkData>, false, '');
      store.dispatch(setPageTotal(result?.totalPages as string)); //! тут получаю общее количество страниц
      store.dispatch(setPageCurrent('1')); //! сбиваю текущую страницу, т.к. изменяется общее количество страниц
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
