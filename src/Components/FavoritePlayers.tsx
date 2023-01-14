import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setColor } from '../Store/colorSlice';
import { RootState } from '../Store/store';
import Player from './Player';

type Props = {
  favoritePlayers: any[];
  removePlayerFromFavorites: (id: number) => void;
  removeAllFavorites: () => void;
};

const FavoritePlayers = ({
  favoritePlayers,
  removePlayerFromFavorites,
  removeAllFavorites,
}: Props) => {
  // const [color, setColor] = useState<string>('');
  const color = useSelector((state: RootState) => state.colorSet.color);
  const dispatch = useDispatch();
  return (
    <div className='fav-players' style={{ backgroundColor: color }}>
      <div className='fav-players-info'>
        <h1>fav</h1>
        <label htmlFor='background-color'>
          change background colol for this section:{' '}
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
          <button onClick={() => removeAllFavorites()}>remove all favs</button>
        </div>
      </div>
      <ul className='fav-players-list'>
        {favoritePlayers.map((player) => {
          return (
            <Player
              action={removePlayerFromFavorites}
              removePlayerFromFavorites={removePlayerFromFavorites}
              favorite={player.fav}
              key={player.id}
              player={player}
            ></Player>
          );
        })}
      </ul>
    </div>
  );
};

export default FavoritePlayers;
