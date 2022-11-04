import { configureStore } from '@reduxjs/toolkit';
import formCardsReducer from './formCardsSlice';
import homePageArtworksReducer from './homePageArtworksSlice';
import searchReducer from './searchSlice';
import sortingReducer from './sortingSlice';

export const store = configureStore({
  reducer: {
    formCards: formCardsReducer,
    homePageArtworks: homePageArtworksReducer,
    search: searchReducer,
    sorting: sortingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
