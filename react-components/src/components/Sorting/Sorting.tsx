import React, { useEffect, useReducer } from 'react';
import { AuthorSorting, DateSorting, getSortedData, TitleSorting } from '../../api/getSortedData';
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
  const { sortingValue, setSortingValue } = useHomePageContext();
  const { objForSorting, setObjForSorting } = useHomePageContext();
  const { limitValue, setLimitValue } = useHomePageContext();

  const [state, dispatch] = useReducer(sortingReducer, { objForSorting: {} });
  const sortingSelect: React.RefObject<HTMLSelectElement> = React.createRef();

  useEffect(() => {
    (sortingSelect.current as HTMLSelectElement).value = sortingValue;

    //! сделать дополнительно сохранение в localStorage - ???
    // (sortingSelect.current as HTMLSelectElement).value =
    //   localStorage.getItem('valueSortingSelect') || '';
    // const action = {
    //   type: (sortingSelect.current as HTMLSelectElement).value as SortingActionOption,
    // };
    // dispatch(action);
    // const nextState = sortingReducer(state, action); //! для того чтобы получить актуальный стейт для setObjForSorting
    // setObjForSorting(nextState.objForSorting as DateSorting | TitleSorting | AuthorSorting);
  }, []);

  useEffect(() => {
    setSortingValue((sortingSelect.current as HTMLSelectElement).value as '' | SortingActionOption);
    //! сделать дополнительно сохранение в localStorage - ???
    // localStorage.setItem('valueSortingSelect', (sortingSelect.current as HTMLSelectElement).value);
  }, [setSortingValue, sortingSelect]);

  const changeHandler = async () => {
    const action = {
      type: (sortingSelect.current as HTMLSelectElement).value as SortingActionOption,
    };
    dispatch(action);

    const nextState = sortingReducer(state, action); //! для того чтобы получить актуальный стейт для вызова getSortedData
    console.log('nextState=', nextState);

    setObjForSorting(nextState.objForSorting);

    try {
      props.changeHomePageState([], true, '');
      console.log('nextState.objForSorting=', nextState.objForSorting);
      console.log('sortingSelect.current=', (sortingSelect.current as HTMLSelectElement).value);
      const artWorksList = await getSortedData(searchValue, limitValue, nextState.objForSorting);
      props.changeHomePageState(artWorksList as Array<IArtWorkData>, false, '');
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
