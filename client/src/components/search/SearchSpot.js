import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SpotifyWebApi from 'spotify-web-api-node';

function SearchSpot() {
  const [token, setToken] = useState('');
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // This compoennt is for testing the search Artists Tracks function
  const { REACT_APP_CLIENT_ID, REACT_APP_CLIENT_SECRET } = process.env;

  // New instance of the SpotifyWebApi
  const spotifyApi = new SpotifyWebApi();

  // Testing spotify-web-api node

  useEffect(() => {
    // spotifyApi.setAccessToken(token);
    spotifyApi.searchTracks('Humble Kendrick Lamar').then(
      function (data) {
        console.log('Search by "Love"', data.body);
      },
      function (err) {
        console.error(err);
      }
    );

    spotifyApi.searchTracks('track:Alright artist:Kendrick Lamar').then(
      function (data) {
        console.log(
          'Search tracks by "Alright" in the track name and "Kendrick Lamar" in the artist name',
          data.body
        );
      },
      function (err) {
        console.log('Something went wrong!', err);
      }
    );
    spotifyApi.searchArtists('doja cat').then(
      function (data) {
        console.log('Search artist', data.body);
      },
      function (err) {
        console.error(err);
      }
    );
  }, [token]);

  // Make a call to Spotify api using axios
  useEffect(() => {
    axios('https://accounts.spotify.com/api/token', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization:
          'Basic ' + btoa(REACT_APP_CLIENT_ID + ':' + REACT_APP_CLIENT_SECRET),
      },
      data: 'grant_type=client_credentials',
      method: 'POST',
    }).then((tokenResponse) => {
      // Once we get a Spotify token we can get the Genres list using the token
      console.log('Successfully Recieve Spotify Token');
      spotifyApi.setAccessToken(tokenResponse.data.access_token); // Getting accessToken to spotifyApi is very important!!!
      setToken(tokenResponse.data.access_token);
    });
  }, []);

  //REFERENCE on how to get SEARCH going: https://github.com/WebDevSimplified/spotify-clone/blob/main/client/src/Dashboard.js
  return (
    <div className='h-80 w-auto'>
      <form onSubmit={() => {}}>
        <div className='h-auto inline-flex '>
          <div>
            {' '}
            <i className='fa fa-search text-gray-400 z-20 hover:text-gray-500'></i>{' '}
          </div>{' '}
          <input
            type='text'
            className='h-14 w-96 pl-10 pr-20 rounded-lg z-0 focus:shadow focus:outline-none'
            placeholder='Search anything...'
          />
          <div>
            {' '}
            <button className='h-10 w-20 text-white rounded-lg bg-red-500 hover:bg-red-600'>
              Search
            </button>{' '}
          </div>
        </div>
      </form>
    </div>
  );
}

export default SearchSpot;
