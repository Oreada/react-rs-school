import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type PaginationState = {
  pageCurrent: string;
  pageTotal: string;
};

type Payload = string;

const initialState: PaginationState = {
  pageCurrent: '1',
  pageTotal: '1',
};

const paginationSlice = createSlice({
  name: 'pagination',
  initialState: initialState,
  reducers: {
    setPageCurrent(state, action: PayloadAction<Payload>) {
      state.pageCurrent = action.payload;
    },
    setPageTotal(state, action: PayloadAction<Payload>) {
      state.pageTotal = action.payload;
    },
  },
});

export const { setPageCurrent, setPageTotal } = paginationSlice.actions;

export default paginationSlice.reducer; //! экспорт без имени! в файле index.ts импортировала его как paginationReducer
