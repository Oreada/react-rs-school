import { configureStore } from '@reduxjs/toolkit';
import formCardsReducer from './formCardsSlice';
import homePageArtworksReducer from './homePageArtworksSlice';
import searchReducer from './searchSlice';
import sortingReducer from './sortingSlice';
import objForSortingReducer from './objForSortingSlice';
import limitReducer from './limitSlice';
import paginationReducer from './paginationSlice';

export const store = configureStore({
  reducer: {
    formCards: formCardsReducer,
    homePageArtworks: homePageArtworksReducer,
    search: searchReducer,
    sorting: sortingReducer,
    objForSorting: objForSortingReducer,
    limit: limitReducer,
    pagination: paginationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
