import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import AllPlayers from './Components/AllPlayers';
import FavoritePlayers from './Components/FavoritePlayers';
import { PlayerObj } from './Models/Player';
import {
  setError,
  setLoading,
  setTotalPages,
  setTotalResults,
} from './Store/pageSlice';
import { setPlayers } from './Store/playersSlice';
import { RootState } from './Store/store';

const App: React.FC = () => {
  const dispatch = useDispatch();
  let url = 'https://www.balldontlie.io/api/v1/players';
  const page = useSelector((state: RootState) => state.pageSet.page);
  const query = useSelector((state: RootState) => state.filterSet.query);
  const favoritePlayers = useSelector(
    (state: RootState) => state.playersSet.favPlayers
  );

  const getPlayers = useCallback(async () => {
    try {
      const data = await fetch(
        `${url}?search=${query}&per_page=12&page=${page}`
      );
      if (!data.ok) throw new Error(data.statusText);
      const jsonPlayers = await data.json();
      let currPlayers = jsonPlayers.data;
      // for each favorite player if it's in the current results rendered, add a the fav property to show render correctly
      favoritePlayers.forEach((favPlayer) => {
        let currentPlayer = currPlayers.find(
          (player: PlayerObj) => player.id === favPlayer.id
        );
        if (currentPlayer) {
          currentPlayer.fav = true;
        }
      });
      dispatch(setPlayers(currPlayers));
      dispatch(setTotalPages(jsonPlayers.meta.total_pages));
      dispatch(setTotalResults(jsonPlayers.meta.total_count));
      dispatch(setLoading(false));
      dispatch(setError(null));
    } catch (e) {
      dispatch(setError(e));
    }
  }, [query, page, favoritePlayers, dispatch, url]);

  useEffect(() => {
    let subscribed = true;
    // the following make sures there is no double fetch (useEffect-react18)
    queueMicrotask(() => {
      if (subscribed) {
        getPlayers();
      }
    });
    return () => {
      // unmount
      subscribed = false;
    };
  }, [getPlayers]);

  return (
    <div className='App'>
      <h1>Favorite NBA Players</h1>
      <div className='sections'>
        <AllPlayers></AllPlayers>
        <FavoritePlayers></FavoritePlayers>
      </div>
    </div>
  );
};

export default App;
