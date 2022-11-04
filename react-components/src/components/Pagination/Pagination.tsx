import React from 'react';
import { getSortedData } from '../../api/getSortedData';
import { IArtWorkData } from '../../pages/HomePage/HomePage';
import { store } from '../../store';
import { useAppSelector } from '../../store/hook';
import { setPageCurrent, setPageTotal } from '../../store/paginationSlice';
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
  const pageCurrent = useAppSelector((state) => state.pagination.pageCurrent); //! так достаём данные из redux store
  const pageTotal = useAppSelector((state) => state.pagination.pageTotal); //! так достаём данные из redux store

  const homePageFunc = async (currentPageNew: string) => {
    try {
      changeHomePageState([], true, '');
      const result = await getSortedData(searchValue, limitValue, objForSorting, currentPageNew);
      changeHomePageState(result?.artWorksList as Array<IArtWorkData>, false, '');
      store.dispatch(setPageTotal(result?.totalPages as string)); //! тут получаю общее количество страниц
    } catch (e: unknown) {
      const err = e as Error;
      changeHomePageState([], false, err.message);
    }
  };

  const leftClickHandler = async () => {
    if (Number(pageCurrent) > 1) {
      const currentPageNew = String(Number(pageCurrent) - 1);
      store.dispatch(setPageCurrent(currentPageNew));

      await homePageFunc(currentPageNew);
    }
  };

  const rightClickHandler = async () => {
    if (Number(pageCurrent) < Number(pageTotal)) {
      const currentPageNew = String(Number(pageCurrent) + 1);
      store.dispatch(setPageCurrent(currentPageNew));

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
