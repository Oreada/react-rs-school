import React from 'react';
import { createContext, useContext } from 'react';
import { DateSorting, TitleSorting, AuthorSorting } from './api/getSortedData';
import { ICard } from './components/Card/Card';
import { SortingActionOption } from './reducer';
import { ResultsPerPageOption } from './components/ResultsPerPage/ResultsPerPage';
import { IArtWorkData } from './pages/HomePage/HomePage';

export const Context = React.createContext('initial test value');

export type FormGlobalContent = {
  addCard: (card: ICard) => void;
};

export const FormContext = createContext<FormGlobalContent>({
  // eslint-disable-next-line prettier/prettier
  addCard: () => { },
});

export const useFormContext = () => useContext(FormContext);

export type HomePageGlobalContent = {
  store: Array<IArtWorkData>;
  setStore: (c: Array<IArtWorkData>) => void;
  searchValue: string;
  setSearchValue: (c: string) => void;
  sortingValue: SortingActionOption | '';
  setSortingValue: (c: SortingActionOption | '') => void;
  objForSorting: DateSorting | TitleSorting | AuthorSorting | unknown;
  setObjForSorting: (c: DateSorting | TitleSorting | AuthorSorting | unknown) => void;
  limitValue: ResultsPerPageOption | '';
  setLimitValue: (c: ResultsPerPageOption | '') => void;
};

export const HomePageContext = createContext<HomePageGlobalContent>({
  store: [],
  // eslint-disable-next-line prettier/prettier
  setStore: () => { },
  searchValue: '',
  // eslint-disable-next-line prettier/prettier
  setSearchValue: () => { },
  sortingValue: '',
  // eslint-disable-next-line prettier/prettier
  setSortingValue: () => { },
  objForSorting: {},
  // eslint-disable-next-line prettier/prettier
  setObjForSorting: () => { },
  limitValue: '',
  // eslint-disable-next-line prettier/prettier
  setLimitValue: () => { },
});

export const useHomePageContext = () => useContext(HomePageContext);
