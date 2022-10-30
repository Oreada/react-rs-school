import React from 'react';
import { getSortedData } from '../../api/getSortedData';
import { useHomePageContext } from '../../context';
import { IArtWorkData } from '../../pages/HomePage/HomePage';
import styles from './Pagination.module.css';

interface PaginationProps {
  changeHomePageState: (
    newList: Array<IArtWorkData>,
    newLoading: boolean,
    newErrorMessage: string
  ) => void;
}

export function Pagination(props: PaginationProps) {
  const { searchValue, setSearchValue } = useHomePageContext();
  const { objForSorting, setObjForSorting } = useHomePageContext();
  const { limitValue, setLimitValue } = useHomePageContext();
  const { pageCurrent, setPageCurrent } = useHomePageContext();
  const { pageTotal, setPageTotal } = useHomePageContext();

  const homePageFunc = async (currentPageNew: string) => {
    try {
      props.changeHomePageState([], true, '');
      const result = await getSortedData(searchValue, limitValue, objForSorting, currentPageNew);
      props.changeHomePageState(result?.artWorksList as Array<IArtWorkData>, false, '');
      setPageTotal(result?.totalPages as string); //! тут получаю общее количество страниц
    } catch (e: unknown) {
      const err = e as Error;
      props.changeHomePageState([], false, err.message);
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
