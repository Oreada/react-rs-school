import { createSlice, PayloadAction, createAsyncThunk, AsyncThunk } from '@reduxjs/toolkit';
import { AuthorSorting, DateSorting, IGetData, TitleSorting } from '../api/getSortedData';
import { IArtWorkData } from '../pages/HomePage/HomePage';

type HomePageArtworksState = {
  list: Array<IArtWorkData>;
  loading: boolean;
  error: string | null;

  pageCurrent: string;
  pageTotal: string;
};

type PayloadMain = Array<IArtWorkData>;

type InnerParams = {
  value: string;
  limit: string;
  obj: DateSorting | TitleSorting | AuthorSorting | unknown;
  page: string;
};

//! <чтоВозвращает, чтоПринимает, допОпции>
export const getData: AsyncThunk<IGetData, InnerParams, { rejectValue: string }> = createAsyncThunk<
  IGetData,
  InnerParams,
  { rejectValue: string }
>('homePageArtworks/getData', async function ({ value, limit, obj, page }, { rejectWithValue }) {
  try {
    const response = await fetch(
      `https://api.artic.edu/api/v1/artworks/search?q=${value}&query[term][is_public_domain]=true&fields=id,title,artist_title,date_display,artwork_type_title,dimensions,artist_display,image_id&page=${page}&limit=${limit}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
      }
    );

    if (!response.ok) {
      throw new Error(`Request failed with status code ${response.status}`);
    }

    const respJson = await response.json();
    if (!respJson.hasOwnProperty('data')) {
      throw new Error(`Incorrect content format`);
    }
    const artWorksList = respJson.data;

    const totalPages = respJson.pagination.total_pages;
    const currentPage = respJson.pagination.current_page;

    return {
      artWorksList: artWorksList,
      totalPages: totalPages,
      currentPage: currentPage,
    };
  } catch (e) {
    const err = e as Error;
    return rejectWithValue(err.message);
  }
});

const initialState: HomePageArtworksState = {
  list: [],
  loading: false,
  error: null,

  pageCurrent: '1',
  pageTotal: '1',
};

const homePageArtworksSlice = createSlice({
  name: 'homePageArtworks',
  initialState: initialState,
  reducers: {
    setHomePageArtworks(state, action: PayloadAction<PayloadMain>) {
      console.log('state=', state);
      console.log('action=', action);

      state.list = action.payload; //! переопределяю массив на новый
    },
    setPageCurrent(state, action: PayloadAction<string>) {
      state.pageCurrent = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getData.pending, (state) => {
        state.loading = true;
        state.list = [];
        state.error = null;
      })
      .addCase(getData.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.artWorksList;
        state.pageTotal = action.payload.totalPages;
      })
      .addCase(getData.rejected, (state, action) => {
        state.loading = false;
        state.list = [];
        state.error = action.payload as string;
      });
  },
});

export const { setHomePageArtworks, setPageCurrent } = homePageArtworksSlice.actions;

export default homePageArtworksSlice.reducer; //! экспорт без имени! в файле index.ts импортировала его как homePageArtworksReducer
