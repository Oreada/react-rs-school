import React, { useEffect } from 'react';
import { getData, setPageCurrent } from '../../store/homePageArtworksSlice';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { setLimit } from '../../store/limitSlice';
import styles from './ResultsPerPage.module.css';

export enum ResultsPerPageOption {
  'twenty' = '20',
  'thirty' = '30',
  'fourty' = '40',
}

export function ResultsPerPage() {
  const searchValue = useAppSelector((state) => state.search.value); //! так достаём данные из redux store
  const objForSorting = useAppSelector((state) => state.objForSorting.obj);
  const limitValue = useAppSelector((state) => state.limit.value);

  const dispatch = useAppDispatch();

  const resultsPerPageSelect: React.RefObject<HTMLSelectElement> = React.createRef();

  useEffect(() => {
    (resultsPerPageSelect.current as HTMLSelectElement).value = limitValue;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(
      setLimit(
        (resultsPerPageSelect.current as HTMLSelectElement).value as '' | ResultsPerPageOption
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resultsPerPageSelect]);

  const changeHandler = async () => {
    dispatch(
      setLimit(
        (resultsPerPageSelect.current as HTMLSelectElement).value as '' | ResultsPerPageOption
      )
    );

    dispatch(setPageCurrent('1')); //! сбиваю текущую страницу, т.к. изменяется общее количество страниц
    dispatch(
      getData({
        value: searchValue,
        limit: (resultsPerPageSelect.current as HTMLSelectElement).value,
        obj: objForSorting,
        page: '1',
      })
    );
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
        -- Results per page --
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
