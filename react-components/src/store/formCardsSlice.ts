import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICard } from '../components/Card/Card';

type FormCardsState = {
  list: Array<ICard>;
};

type Payload = {
  name: string;
  phone: string;
  adress: string;
  delivery: string;
  payment: string;
};

const initialState: FormCardsState = {
  list: [],
};

const formCardsSlice = createSlice({
  name: 'formCards',
  initialState: initialState,
  reducers: {
    addFormCard(state, action: PayloadAction<Payload>) {
      console.log('state=', state);
      console.log('action=', action);

      state.list.push({
        //! с useState так нельзя, там мы делаем: [...prev, newObj]
        name: action.payload.name,
        phone: action.payload.phone,
        adress: action.payload.adress,
        delivery: action.payload.delivery,
        payment: action.payload.payment,
      });
    },
  },
});

export const { addFormCard } = formCardsSlice.actions;

export default formCardsSlice.reducer; //! экспорт без имени! в файле index.ts импортировали его как formCardsReducer
