import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type IdDetailsState = {
  idDetails: number;
};

type Payload = number;

const initialState: IdDetailsState = {
  idDetails: 0,
};

const idDetailsSlice = createSlice({
  name: 'idDetails',
  initialState: initialState,
  reducers: {
    setIdDetails(state, action: PayloadAction<Payload>) {
      state.idDetails = action.payload;
    },
  },
});

export const { setIdDetails } = idDetailsSlice.actions;

export default idDetailsSlice.reducer; //! в файле index.ts импортировала его как idDetailsReducer
