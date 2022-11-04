import React, { useEffect, useReducer } from 'react';
import { getSortedData } from '../../api/getSortedData';
import { IArtWorkData } from '../../pages/HomePage/HomePage';
import { SortingActionOption, sortingReducer } from '../../reducer';
import { useAppSelector } from '../../store/hook';
import { store } from '../../store';
import styles from './Sorting.module.css';
import { setSorting } from '../../store/sortingSlice';
import { setObjForSorting } from '../../store/objForSortingSlice';
import { setPageTotal, setPageCurrent } from '../../store/paginationSlice';

interface SortingProps {
  changeHomePageState: (
    newList: Array<IArtWorkData>,
    newLoading: boolean,
    newErrorMessage: string
  ) => void;
}

export function Sorting(props: SortingProps) {
  const searchValue = useAppSelector((state) => state.search.value); //! так достаём данные из redux store
  const sortingValue = useAppSelector((state) => state.sorting.value); //! так достаём данные из redux store
  const limitValue = useAppSelector((state) => state.limit.value); //! так достаём данные из redux store

  const [state, dispatch] = useReducer(sortingReducer, { objForSorting: {} });
  const sortingSelect: React.RefObject<HTMLSelectElement> = React.createRef();

  useEffect(() => {
    (sortingSelect.current as HTMLSelectElement).value = sortingValue;
  }, []);

  useEffect(() => {
    store.dispatch(
      setSorting((sortingSelect.current as HTMLSelectElement).value as '' | SortingActionOption)
    );
  }, [setSorting, sortingSelect]);

  const changeHandler = async () => {
    const action = {
      type: (sortingSelect.current as HTMLSelectElement).value as SortingActionOption,
    };
    dispatch(action);

    const nextState = sortingReducer(state, action); //! для того чтобы получить актуальный стейт для вызова getSortedData

    store.dispatch(setObjForSorting(nextState.objForSorting));

    try {
      props.changeHomePageState([], true, '');
      const result = await getSortedData(searchValue, limitValue, nextState.objForSorting, '1');
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
      className={styles['sorting-select']}
      id="sorting-select"
      data-testid="sorting-select"
      ref={sortingSelect}
      onChange={changeHandler}
    >
      <option className={styles['sorting-option']} value="">
        -- Select the sorting method --
      </option>
      <option className={styles['sorting-option']} value="title-ascending">
        Title ascending
      </option>
      <option className={styles['sorting-option']} value="title-descending">
        Title descending
      </option>
      <option className={styles['sorting-option']} value="author-ascending">
        Author&apos;s name ascending
      </option>
      <option className={styles['sorting-option']} value="author-descending">
        Author&apos;s name descending
      </option>
      <option className={styles['sorting-option']} value="date-ascending">
        Date ascending
      </option>
      <option className={styles['sorting-option']} value="date-descending">
        Date descending
      </option>
    </select>
  );
}
