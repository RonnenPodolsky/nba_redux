import React from 'react';
import { useDispatch } from 'react-redux';
import { PlayerObj } from '../Models/Player';
import {
  addPlayerToFavorites,
  removePlayerFromFavorites,
} from '../Store/playersSlice';

type PlayerProps = {
  player: PlayerObj;
};

const Player = ({ player }: PlayerProps) => {
  const dispatch = useDispatch();

  return (
    <li className='player-card'>
      <p> {`${player.first_name} ${player.last_name}`}</p>
      <p> {player.position && `position: ${player.position}`}</p>
      <p> {`team: ${player.team.name}`}</p>
      {player.fav ? 'V ' : null}
      {player.fav ? (
        <button onClick={() => dispatch(removePlayerFromFavorites(player.id))}>
          {'remove'}
        </button>
      ) : (
        <button onClick={() => dispatch(addPlayerToFavorites(player))}>
          {'add to fav'}
        </button>
      )}
    </li>
  );
};

export default Player;
