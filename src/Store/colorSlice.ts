import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: { color: string } = {
  color: '',
};

const colorSlice = createSlice({
  name: 'backgroundColor',
  initialState,
  reducers: {
    setColor: (state, action: PayloadAction<string>) => {
      state.color = action.payload;
    },
  },
});

export const { setColor } = colorSlice.actions;

export default colorSlice;
