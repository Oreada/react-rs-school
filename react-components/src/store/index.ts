import { configureStore } from '@reduxjs/toolkit';
import formCardsReducer from './formCardsSlice';
import homePageArtworksReducer from './homePageArtworksSlice';

export const store = configureStore({
  reducer: {
    formCards: formCardsReducer,
    homePageArtworks: homePageArtworksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
