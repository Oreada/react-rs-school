import React from 'react';
import { store } from '../../store';
import { getData, setPageCurrent } from '../../store/homePageArtworksSlice';
import { useAppSelector } from '../../store/hook';
import styles from './Pagination.module.css';

export function Pagination() {
  const searchValue = useAppSelector((state) => state.search.value); //! так достаём данные из redux store
  const objForSorting = useAppSelector((state) => state.objForSorting.obj);
  const limitValue = useAppSelector((state) => state.limit.value);
  const pageCurrent = useAppSelector((state) => state.homePageArtworks.pageCurrent);
  const pageTotal = useAppSelector((state) => state.homePageArtworks.pageTotal);

  const leftClickHandler = async () => {
    if (Number(pageCurrent) > 1) {
      const currentPageNew = String(Number(pageCurrent) - 1);
      store.dispatch(setPageCurrent(currentPageNew));

      store.dispatch(
        getData({ value: searchValue, limit: limitValue, obj: objForSorting, page: currentPageNew })
      );
    }
  };

  const rightClickHandler = async () => {
    if (Number(pageCurrent) < Number(pageTotal)) {
      const currentPageNew = String(Number(pageCurrent) + 1);
      store.dispatch(setPageCurrent(currentPageNew));

      store.dispatch(
        getData({ value: searchValue, limit: limitValue, obj: objForSorting, page: currentPageNew })
      );
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
