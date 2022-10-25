import React from 'react';
import { createContext, useContext } from 'react';
import { ICard } from './components/Card/Card';

export const Context = React.createContext('initial test value');

export type GlobalContent = {
  // store: Array<ICard>;
  // setStore: (c: string) => void;
  addCard: (card: ICard) => void;
};

export const StoreContext = createContext<GlobalContent>({
  // store: [], // set a default value
  // eslint-disable-next-line prettier/prettier
  // setStore: () => { },
  // eslint-disable-next-line prettier/prettier
  addCard: () => { },
});

export const useStoreContext = () => useContext(StoreContext);
