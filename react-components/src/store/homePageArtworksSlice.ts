import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IArtWorkData } from '../pages/HomePage/HomePage';

type HomePageArtworksState = {
  list: Array<IArtWorkData>;
};

type Payload = Array<IArtWorkData>;

const initialState: HomePageArtworksState = {
  list: [],
};

const homePageArtworksSlice = createSlice({
  name: 'homePageArtworks',
  initialState: initialState,
  reducers: {
    setHomePageArtworks(state, action: PayloadAction<Payload>) {
      console.log('state=', state);
      console.log('action=', action);

      state.list = action.payload; //! переопределяю массив на новый
    },
  },
});

export const { setHomePageArtworks } = homePageArtworksSlice.actions;

export default homePageArtworksSlice.reducer; //! экспорт без имени! в файле index.ts импортировала его как homePageArtworksReducer
