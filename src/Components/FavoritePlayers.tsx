import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setColor } from '../Store/colorSlice';
import { removeAllFavorites } from '../Store/playersSlice';
import { RootState } from '../Store/store';
import Player from './Player';

const FavoritePlayers = () => {
  const dispatch = useDispatch();

  const color = useSelector((state: RootState) => state.colorSet.color);
  const favPlayers = useSelector(
    (state: RootState) => state.playersSet.favPlayers
  );

  return (
    <div className='fav-players' style={{ backgroundColor: color }}>
      <div className='fav-players-info'>
        <h1>fav</h1>
        <label htmlFor='background-color'>
          change background color for this section only:{' '}
        </label>
        <input
          value={color}
          type='text'
          name='background-color'
          id='background-color'
          placeholder='insert color'
          onChange={(e) => dispatch(setColor(e.target.value))}
        />
        <div>
          <button onClick={() => dispatch(removeAllFavorites())}>
            remove all favs
          </button>
        </div>
      </div>
      <ul className='fav-players-list'>
        {favPlayers.map((player) => {
          return <Player key={player.id} player={player}></Player>;
        })}
      </ul>
    </div>
  );
};

export default FavoritePlayers;
