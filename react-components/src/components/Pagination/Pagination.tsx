import React from 'react';
import { getSortedData } from '../../api/getSortedData';
import { useHomePageContext } from '../../context';
import { IArtWorkData } from '../../pages/HomePage/HomePage';
import { useAppSelector } from '../../store/hook';
import styles from './Pagination.module.css';

interface PaginationProps {
  changeHomePageState: (
    newList: Array<IArtWorkData>,
    newLoading: boolean,
    newErrorMessage: string
  ) => void;
}

export function Pagination({ changeHomePageState }: PaginationProps) {
  const searchValue = useAppSelector((state) => state.search.value); //! так достаём данные из redux store
  const objForSorting = useAppSelector((state) => state.objForSorting.obj); //! так достаём данные из redux store
  const limitValue = useAppSelector((state) => state.limit.value); //! так достаём данные из redux store

  const {
    // searchValue,
    // setSearchValue,
    // objForSorting,
    // setObjForSorting,
    // limitValue,
    // setLimitValue,
    pageCurrent,
    setPageCurrent,
    pageTotal,
    setPageTotal,
  } = useHomePageContext();

  const homePageFunc = async (currentPageNew: string) => {
    try {
      changeHomePageState([], true, '');
      const result = await getSortedData(searchValue, limitValue, objForSorting, currentPageNew);
      changeHomePageState(result?.artWorksList as Array<IArtWorkData>, false, '');
      setPageTotal(result?.totalPages as string); //! тут получаю общее количество страниц
    } catch (e: unknown) {
      const err = e as Error;
      changeHomePageState([], false, err.message);
    }
  };

  const leftClickHandler = async () => {
    if (Number(pageCurrent) > 1) {
      const currentPageNew = String(Number(pageCurrent) - 1);
      setPageCurrent(currentPageNew);

      await homePageFunc(currentPageNew);
    }
  };

  const rightClickHandler = async () => {
    if (Number(pageCurrent) < Number(pageTotal)) {
      const currentPageNew = String(Number(pageCurrent) + 1);
      setPageCurrent(currentPageNew);

      await homePageFunc(currentPageNew);
    }
  };

  return (
    <div className={styles['pagination']}>
      <button className={styles['pagination-arrow-left']} onClick={leftClickHandler}></button>
      <div className={styles['pagination-pages']}>
        <span className={styles['pagination-current']}>{pageCurrent}</span>
        <span className={styles['pagination-slash']}>/</span>
        <span className={styles['pagination-total']}>{pageTotal}</span>
      </div>
      <button className={styles['pagination-arrow-right']} onClick={rightClickHandler}></button>
    </div>
  );
}
