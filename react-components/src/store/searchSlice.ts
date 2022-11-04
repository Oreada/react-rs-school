import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type SearchState = {
  value: string;
};

type Payload = string;

const initialState: SearchState = {
  value: '',
};

const searchSlice = createSlice({
  name: 'search',
  initialState: initialState,
  reducers: {
    setSearch(state, action: PayloadAction<Payload>) {
      state.value = action.payload;
    },
  },
});

export const { setSearch } = searchSlice.actions;

export default searchSlice.reducer; //! экспорт без имени! в файле index.ts импортировала его как searchReducer
