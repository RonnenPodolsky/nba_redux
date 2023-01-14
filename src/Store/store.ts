import { configureStore } from '@reduxjs/toolkit';
import colorSlice from './colorSlice';
import filterSlice from './filterSlice';
import pageSlice from './pageSlice';
import playersSlice from './playersSlice';

const store = configureStore({
  reducer: {
    colorSet: colorSlice.reducer,
    pageSet: pageSlice.reducer,
    filterSet: filterSlice.reducer,
    playersSet: playersSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
