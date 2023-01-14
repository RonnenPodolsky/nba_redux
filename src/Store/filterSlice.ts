import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: { query: string } = {
  query: '',
};

const filterSlice = createSlice({
  name: 'query',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    resetQuery: (state) => {
      state.query = '';
    },
  },
});

export const { setQuery, resetQuery } = filterSlice.actions;

export default filterSlice;
