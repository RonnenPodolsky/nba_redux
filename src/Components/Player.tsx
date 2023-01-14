import React from 'react';
import { PlayerObj } from '../Models/Player';

type PlayerProps = {
  player: PlayerObj;
  action: (id: number) => void;
  favorite: boolean;
  removePlayerFromFavorites: (id: number) => void;
};

const Player = ({
  player,
  action,
  favorite,
  removePlayerFromFavorites,
}: PlayerProps) => {
  return (
    <li className='player-card'>
      <p> {`${player.first_name} ${player.last_name}`}</p>
      <p> {player.position && `position: ${player.position}`}</p>
      <p> {`team: ${player.team.name}`}</p>
      {favorite ? 'V ' : null}
      {favorite && (
        <button onClick={() => removePlayerFromFavorites(player.id)}>
          {'remove'}
        </button>
      )}
      {!favorite && (
        <button onClick={() => action(player.id)}>{'add to fav'}</button>
      )}
    </li>
  );
};

export default Player;
