import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DateSorting, TitleSorting, AuthorSorting } from '../api/getSortedData';

type objForSortingState = {
  obj: DateSorting | TitleSorting | AuthorSorting | unknown;
};

type Payload = DateSorting | TitleSorting | AuthorSorting | unknown;

const initialState: objForSortingState = {
  obj: {},
};

const objForSortingSlice = createSlice({
  name: 'objForSorting',
  initialState: initialState,
  reducers: {
    setObjForSorting(state, action: PayloadAction<Payload>) {
      state.obj = action.payload;
    },
  },
});

export const { setObjForSorting } = objForSortingSlice.actions;

export default objForSortingSlice.reducer; //! экспорт без имени! в файле index.ts импортировала его как objForSortingReducer
