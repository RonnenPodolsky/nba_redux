import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PlayerObj } from '../Models/Player';

export interface PlayersSliceState {
  players: PlayerObj[];
  favPlayers: PlayerObj[];
}

export const initialState: PlayersSliceState = {
  players: [],
  favPlayers: [],
};

const playersSlice = createSlice({
  name: 'Players',
  initialState,
  reducers: {
    setPlayers: (state, action: PayloadAction<PlayerObj[]>) => {
      state.players = [...action.payload];
    },
    removeAllFavorites: (state) => {
      state.favPlayers = [];
    },
    addPlayerToFavorites: (state, action: PayloadAction<PlayerObj>) => {
      let PlayerToAdd = state.favPlayers.find(
        (player) => player.id === action.payload.id
      );
      if (PlayerToAdd) {
        return;
      } else {
        state.favPlayers = [
          ...state.favPlayers,
          { ...action.payload, fav: true },
        ];
      }
    },
    removePlayerFromFavorites: (state, action: PayloadAction<number>) => {
      state.favPlayers = state.favPlayers.filter(
        (player) => action.payload !== player.id
      );
    },
  },
});

export const {
  setPlayers,
  removeAllFavorites,
  addPlayerToFavorites,
  removePlayerFromFavorites,
} = playersSlice.actions;

export default playersSlice;
