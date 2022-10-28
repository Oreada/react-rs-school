import React, { useEffect, useReducer } from 'react';
import { getSortedData } from '../../api/getSortedData';
import { useHomePageContext } from '../../context';
import { IArtWorkData } from '../../pages/HomePage/HomePage';
import { SortingActionOption, sortingReducer } from '../reducer';
import styles from './Sorting.module.css';

interface SortingProps {
  changeHomePageState: (
    newList: Array<IArtWorkData>,
    newLoading: boolean,
    newErrorMessage: string
  ) => void;
}

export function Sorting(props: SortingProps) {
  const { searchValue, setSearchValue } = useHomePageContext();

  const [state, dispatch] = useReducer(sortingReducer, { objForSorting: {} });
  const sortingSelect: React.RefObject<HTMLSelectElement> = React.createRef();

  useEffect(() => {
    (sortingSelect.current as HTMLSelectElement).value =
      localStorage.getItem('valueSortingSelect') || '';
  }, []);

  useEffect(() => {
    localStorage.setItem('valueSortingSelect', (sortingSelect.current as HTMLSelectElement).value);
  }, [sortingSelect]);

  const changeHandler = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    // setSearchValue()

    const action = {
      type: (sortingSelect.current as HTMLSelectElement).value as SortingActionOption,
    };
    dispatch(action);

    const nextState = sortingReducer(state, action); //! для того чтобы получить актуальный стейт для вызова getSortedData
    console.log('nextState=', nextState);

    try {
      props.changeHomePageState([], true, '');
      console.log('state.objForSorting=', state.objForSorting);
      console.log('sortingSelect.current=', (sortingSelect.current as HTMLSelectElement).value);
      const artWorksList = await getSortedData(searchValue, nextState.objForSorting);
      props.changeHomePageState(artWorksList as Array<IArtWorkData>, false, '');
    } catch (e: unknown) {
      const err = e as Error;
      props.changeHomePageState([], false, err.message);
    }
  };

  return (
    <div className={styles['selects-box']}>
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
    </div>
  );
}
