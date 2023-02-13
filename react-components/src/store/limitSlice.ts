import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ResultsPerPageOption } from '../components/ResultsPerPage/ResultsPerPage';

type LimitState = {
  value: ResultsPerPageOption | '';
};

type Payload = ResultsPerPageOption | '';

const initialState: LimitState = {
  value: '',
};

const limitSlice = createSlice({
  name: 'limit',
  initialState: initialState,
  reducers: {
    setLimit(state, action: PayloadAction<Payload>) {
      state.value = action.payload;
    },
  },
});

export const { setLimit } = limitSlice.actions;

export default limitSlice.reducer; //! в файле index.ts импортировала его как limitReducer
