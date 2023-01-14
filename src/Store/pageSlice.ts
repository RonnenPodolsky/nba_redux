import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: {
  page: number;
  totalPages: number;
  totalResults: number;
  loading: boolean;
  error: null | string | unknown;
} = {
  page: 1,
  totalPages: 1,
  totalResults: 0,
  loading: true,
  error: null,
};

const pageSlice = createSlice({
  name: 'pageSet',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    pageIncrement: (state) => {
      state.page += 1;
    },
    pageDecrement: (state) => {
      state.page -= 1;
    },
    setTotalPages: (state, action: PayloadAction<number>) => {
      state.totalPages = action.payload;
    },
    setTotalResults: (state, action: PayloadAction<number>) => {
      state.totalResults = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | unknown | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setPage,
  pageIncrement,
  pageDecrement,
  setTotalPages,
  setTotalResults,
  setLoading,
  setError,
} = pageSlice.actions;

export default pageSlice;
