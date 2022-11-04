import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SortingActionOption } from '../reducer';

type SortingState = {
  value: SortingActionOption | '';
};

type Payload = SortingActionOption | '';

const initialState: SortingState = {
  value: '',
};

const sortingSlice = createSlice({
  name: 'sorting',
  initialState: initialState,
  reducers: {
    setSorting(state, action: PayloadAction<Payload>) {
      state.value = action.payload;
    },
  },
});

export const { setSorting } = sortingSlice.actions;

export default sortingSlice.reducer; //! экспорт без имени! в файле index.ts импортировала его как sortingReducer
