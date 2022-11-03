import { configureStore } from '@reduxjs/toolkit';
import formCardsReducer from './formCardsSlice';

export const store = configureStore({
  reducer: {
    formCards: formCardsReducer,
    // user: userReduser, etc...
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
