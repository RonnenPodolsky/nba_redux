import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import AllPlayers from './Components/AllPlayers';
import FavoritePlayers from './Components/FavoritePlayers';
import { PlayerObj } from './Models/Player';
import { setLoading, setTotalPages, setTotalResults } from './Store/pageSlice';
import { RootState } from './Store/store';

const App: React.FC = () => {
  const dispatch = useDispatch();
  let url = 'https://www.balldontlie.io/api/v1/players';

  const page = useSelector((state: RootState) => state.pageSet.page);
  const query = useSelector((state: RootState) => state.filterSet.query);

  const [players, setPlayers] = useState<any[]>([]);
  const [favoritePlayers, setFavoritePlayers] = useState<any[]>([]);

  const removePlayerFromFavorites = (id: number): void => {
    let playerToRemove = favoritePlayers.find((player) => id === player?.id);
    playerToRemove.fav = false;
    // remove requested player from favorites by filtering it out
    let favoritePlayerRemoved = favoritePlayers.filter(
      (player) => player.id !== playerToRemove.id
    );
    setFavoritePlayers(favoritePlayerRemoved);
  };

  const addPlayerToFavorites = (id: number): void => {
    let playerToAdd = players.find((player) => id === player.id);
    playerToAdd.fav = true;
    if (favoritePlayers.find((player) => player.id === playerToAdd.id)) return; // if player already in favorites don't add again
    setFavoritePlayers((prev) => [...prev, playerToAdd]);
  };

  const removeAllFavorites = (): void => {
    setFavoritePlayers([]);
  };

  const getPlayers = useCallback(async () => {
    const data = await fetch(`${url}?search=${query}&per_page=12&page=${page}`);
    const jsonPlayers = await data.json();
    let currPlayers = jsonPlayers.data;
    console.log(currPlayers);
    // for each favorite player if it's in the current results rendered, add a the fav property to show render correctly
    favoritePlayers.forEach((favPlayer) => {
      let currentPlayer = currPlayers.find(
        (player: PlayerObj) => player.id === favPlayer.id
      );
      if (currentPlayer) {
        currentPlayer.fav = true;
      }
    });

    setPlayers(currPlayers);
    dispatch(setTotalPages(jsonPlayers.meta.total_pages));
    dispatch(setTotalResults(jsonPlayers.meta.total_count));
    dispatch(setLoading(false));
  }, [query, page, favoritePlayers, dispatch, url]);

  useEffect(() => {
    let subscribed = true;
    queueMicrotask(() => {
      if (subscribed) {
        getPlayers();
      }
    });
    return () => {
      subscribed = false;
    };
  }, [getPlayers]);

  return (
    <div className='App'>
      <h1>Favorite NBA Players</h1>
      <div className='sections'>
        <AllPlayers
          players={players}
          addPlayerToFavorites={addPlayerToFavorites}
          removePlayerFromFavorites={removePlayerFromFavorites}
        ></AllPlayers>
        <FavoritePlayers
          removePlayerFromFavorites={removePlayerFromFavorites}
          favoritePlayers={favoritePlayers}
          removeAllFavorites={removeAllFavorites}
        ></FavoritePlayers>
      </div>
    </div>
  );
};

export default App;
