/* eslint-disable prettier/prettier */
import { createContext, useContext } from 'react';
// import { DateSorting, TitleSorting, AuthorSorting } from './api/getSortedData';
// import { SortingActionOption } from './reducer';
import { ResultsPerPageOption } from './components/ResultsPerPage/ResultsPerPage';

export type HomePageGlobalContent = {
  // searchValue: string;
  // setSearchValue: (c: string) => void;
  // sortingValue: SortingActionOption | '';
  // setSortingValue: (c: SortingActionOption | '') => void;
  // objForSorting: DateSorting | TitleSorting | AuthorSorting | unknown;
  // setObjForSorting: (c: DateSorting | TitleSorting | AuthorSorting | unknown) => void;
  limitValue: ResultsPerPageOption | '';
  setLimitValue: (c: ResultsPerPageOption | '') => void;
  pageCurrent: string;
  setPageCurrent: (c: string) => void;
  pageTotal: string;
  setPageTotal: (c: string) => void;
  idDetails: number;
  setIdDetails: (c: number) => void;
};

export const HomePageContext = createContext<HomePageGlobalContent>({
  // searchValue: '',
  // setSearchValue: () => { },
  // sortingValue: '',
  // setSortingValue: () => { },
  // objForSorting: {},
  // setObjForSorting: () => { },
  limitValue: '',
  setLimitValue: () => { },
  pageCurrent: '',
  setPageCurrent: () => { },
  pageTotal: '',
  setPageTotal: () => { },
  idDetails: 0,
  setIdDetails: () => { },
});

export const useHomePageContext = () => useContext(HomePageContext);
