import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetQuery, setQuery } from '../Store/filterSlice';
import { pageDecrement, pageIncrement, setPage } from '../Store/pageSlice';
import { RootState } from '../Store/store';
import Player from './Player';

const AllPlayers = () => {
  const dispatch = useDispatch();
  const { page, error, loading, totalPages, totalResults } = useSelector(
    (state: RootState) => state.pageSet
  );
  const { query } = useSelector((state: RootState) => state.filterSet);
  const { players } = useSelector((state: RootState) => state.playersSet);

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
            disabled={page === 1}
            className='btn'
            onClick={() => {
              dispatch(setPage(1));
            }}
          >
            first page
          </button>

          <div>
            <button
              disabled={page === 1}
              className='btn'
              onClick={() => {
                dispatch(pageDecrement());
              }}
            >
              prev page
            </button>
            {`page: ${totalPages === 0 ? 0 : page} / ${totalPages}`}

            <button
              disabled={page === totalPages}
              className='btn'
              onClick={() => {
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
            return <Player key={player.id} player={player} />;
          })
        )}
      </ul>
    </div>
  );
};

export default AllPlayers;
