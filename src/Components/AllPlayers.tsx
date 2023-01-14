import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetQuery, setQuery } from '../Store/filterSlice';
import { pageDecrement, pageIncrement, setPage } from '../Store/pageSlice';
import { RootState } from '../Store/store';
import Player from './Player';

// type Props = {
//   addPlayerToFavorites: (id: number) => void;
//   removePlayerFromFavorites: (id: number) => void;
// };

const AllPlayers = () => {
  const dispatch = useDispatch();

  const page = useSelector((state: RootState) => state.pageSet.page);
  const error = useSelector((state: RootState) => state.pageSet.error);
  const loading = useSelector((state: RootState) => state.pageSet.loading);
  const query = useSelector((state: RootState) => state.filterSet.query);
  const players = useSelector((state: RootState) => state.playersSet.players);
  const totalPages = useSelector(
    (state: RootState) => state.pageSet.totalPages
  );
  const totalResults = useSelector(
    (state: RootState) => state.pageSet.totalPages
  );

  return (
    <div className='all-players'>
      <div className='all-players-info'>
        <h1>all</h1>
        <label htmlFor='player_name'>search by first or last name: </label>
        <input
          value={query}
          type='text'
          name='player_name'
          id='player_name'
          placeholder='insert name'
          onChange={(e) => {
            dispatch(setQuery(e.target.value));
            dispatch(setPage(1));
          }}
        />
        <button
          className='btn'
          onClick={() => {
            dispatch(setPage(1));
            dispatch(resetQuery());
          }}
        >
          clear
        </button>
        <div>
          {`total results: ${totalResults}`}
          <button
            className='btn'
            onClick={() => {
              dispatch(setPage(1));
            }}
          >
            first page
          </button>

          <div>
            <button
              className='btn'
              onClick={() => {
                if (page === 1) return;
                dispatch(pageDecrement());
              }}
            >
              prev page
            </button>
            {`page: ${totalPages === 0 ? 0 : page} / ${totalPages}`}

            <button
              className='btn'
              onClick={() => {
                if (page === totalPages) return;
                dispatch(pageIncrement());
              }}
            >
              next page
            </button>
          </div>
        </div>
      </div>
      <ul className='all-players-list'>
        {error ? (
          <h2>
            error: slow down, too many requests, wait 10 seconds and retry
          </h2>
        ) : null}
        {loading ? (
          <p>loading...</p>
        ) : (
          !error &&
          players.map((player) => {
            return (
              <Player
                key={player.id}
                player={player}
                // removePlayerFromFavorites={removePlayerFromFavorites}
              ></Player>
            );
          })
        )}
      </ul>
    </div>
  );
};

export default AllPlayers;
