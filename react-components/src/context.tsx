/* eslint-disable prettier/prettier */
import { createContext, useContext } from 'react';

export type HomePageGlobalContent = {
  idDetails: number;
  setIdDetails: (c: number) => void;
};

export const HomePageContext = createContext<HomePageGlobalContent>({
  idDetails: 0,
  setIdDetails: () => { },
});

export const useHomePageContext = () => useContext(HomePageContext);
