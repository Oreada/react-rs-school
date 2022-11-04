import React, { useEffect } from 'react';
import { getSortedData } from '../../api/getSortedData';
import { IArtWorkData } from '../../pages/HomePage/HomePage';
import { store } from '../../store';
import { useAppSelector } from '../../store/hook';
import { setLimit } from '../../store/limitSlice';
import { setPageCurrent, setPageTotal } from '../../store/paginationSlice';
import styles from './ResultsPerPage.module.css';

interface ResultsPerPageProps {
  changeHomePageState: (
    newList: Array<IArtWorkData>,
    newLoading: boolean,
    newErrorMessage: string
  ) => void;
}

export enum ResultsPerPageOption {
  'twenty' = '20',
  'thirty' = '30',
  'fourty' = '40',
}

export function ResultsPerPage(props: ResultsPerPageProps) {
  const searchValue = useAppSelector((state) => state.search.value); //! так достаём данные из redux store
  const objForSorting = useAppSelector((state) => state.objForSorting.obj); //! так достаём данные из redux store
  const limitValue = useAppSelector((state) => state.limit.value); //! так достаём данные из redux store

  const resultsPerPageSelect: React.RefObject<HTMLSelectElement> = React.createRef();

  useEffect(() => {
    (resultsPerPageSelect.current as HTMLSelectElement).value = limitValue;
  }, []);

  useEffect(() => {
    store.dispatch(
      setLimit(
        (resultsPerPageSelect.current as HTMLSelectElement).value as '' | ResultsPerPageOption
      )
    );
  }, [resultsPerPageSelect, setLimit]);

  const changeHandler = async () => {
    store.dispatch(
      setLimit(
        (resultsPerPageSelect.current as HTMLSelectElement).value as '' | ResultsPerPageOption
      )
    );

    try {
      props.changeHomePageState([], true, '');
      const result = await getSortedData(
        searchValue,
        (resultsPerPageSelect.current as HTMLSelectElement).value,
        objForSorting,
        '1'
      );
      props.changeHomePageState(result?.artWorksList as Array<IArtWorkData>, false, '');
      store.dispatch(setPageTotal(result?.totalPages as string)); //! тут получаю общее количество страниц
      store.dispatch(setPageCurrent('1')); //! сбиваю текущую страницу, т.к. изменяется общее количество страниц
    } catch (e: unknown) {
      const err = e as Error;
      props.changeHomePageState([], false, err.message);
    }
  };

  return (
    <select
      className={styles['pagination-select']}
      id="pagination-select"
      data-testid="pagination-select"
      ref={resultsPerPageSelect}
      onChange={changeHandler}
    >
      <option className={styles['pagination-option']} value="">
        -- Select number of results per page --
      </option>
      <option className={styles['pagination-option']} value={ResultsPerPageOption.twenty}>
        {ResultsPerPageOption.twenty}
      </option>
      <option className={styles['pagination-option']} value={ResultsPerPageOption.thirty}>
        {ResultsPerPageOption.thirty}
      </option>
      <option className={styles['pagination-option']} value={ResultsPerPageOption.fourty}>
        {ResultsPerPageOption.fourty}
      </option>
    </select>
  );
}
