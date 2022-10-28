import React, { useEffect, useReducer } from 'react';
import { getSortedData } from '../../api/getSortedData';
import { useHomePageContext } from '../../context';
import { IArtWorkData } from '../../pages/HomePage/HomePage';
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
  const { searchValue, setSearchValue } = useHomePageContext();
  const { objForSorting, setObjForSorting } = useHomePageContext();
  const { limitValue, setLimitValue } = useHomePageContext();

  const resultsPerPageSelect: React.RefObject<HTMLSelectElement> = React.createRef();

  useEffect(() => {
    (resultsPerPageSelect.current as HTMLSelectElement).value = limitValue;

    //! сделать дополнительно сохранение в localStorage - ???
    // см. пример в Sorting.tsx
  }, []);

  useEffect(() => {
    setLimitValue(
      (resultsPerPageSelect.current as HTMLSelectElement).value as '' | ResultsPerPageOption
    );
    //! сделать дополнительно сохранение в localStorage - ???
    // см. пример в Sorting.tsx
  }, [resultsPerPageSelect, setLimitValue]);

  const changeHandler = async () => {
    setLimitValue(
      (resultsPerPageSelect.current as HTMLSelectElement).value as '' | ResultsPerPageOption
    );

    try {
      props.changeHomePageState([], true, '');
      const artWorksList = await getSortedData(
        searchValue,
        (resultsPerPageSelect.current as HTMLSelectElement).value,
        objForSorting
      );
      props.changeHomePageState(artWorksList as Array<IArtWorkData>, false, '');
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
