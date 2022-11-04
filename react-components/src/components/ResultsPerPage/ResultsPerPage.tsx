import React, { useEffect } from 'react';
import { getSortedData } from '../../api/getSortedData';
import { useHomePageContext } from '../../context';
import { IArtWorkData } from '../../pages/HomePage/HomePage';
import { useAppSelector } from '../../store/hook';
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

  const {
    // searchValue,
    // setSearchValue,
    objForSorting,
    setObjForSorting,
    limitValue,
    setLimitValue,
    pageCurrent,
    setPageCurrent,
    pageTotal,
    setPageTotal,
  } = useHomePageContext();

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
      const result = await getSortedData(
        searchValue,
        (resultsPerPageSelect.current as HTMLSelectElement).value,
        objForSorting,
        '1'
      );
      props.changeHomePageState(result?.artWorksList as Array<IArtWorkData>, false, '');
      setPageTotal(result?.totalPages as string); //! тут получаю общее количество страниц
      setPageCurrent('1'); //! сбиваю текущую страницу, т.к. изменяется общее количество страниц
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
