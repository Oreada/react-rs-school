import React from 'react';
import { createContext, useContext } from 'react';
import { ICard } from './components/Card/Card';
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
};

export const HomePageContext = createContext<HomePageGlobalContent>({
  store: [],
  // eslint-disable-next-line prettier/prettier
  setStore: () => { },
});

export const useHomePageContext = () => useContext(HomePageContext);
