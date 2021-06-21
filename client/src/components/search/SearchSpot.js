import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SpotifyWebApi from 'spotify-web-api-node';
import TrackSearchResult from './TrackSearchResult';

function SearchSpot() {
  const [token, setToken] = useState('');
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // This compoennt is for testing the search Artists Tracks function
  const { REACT_APP_CLIENT_ID, REACT_APP_CLIENT_SECRET } = process.env;
  // sometimes as planned
  // New instance of the SpotifyWebApi
  const spotifyApi = new SpotifyWebApi();

  // Testing spotify-web-api node

  useEffect(() => {
    console.log(search);
  }, [search]);

  useEffect(() => {
    if (!search) return setSearchResults([]);
    spotifyApi.setAccessToken(token); // just to make sure because sometimes searchTracks doesnt work
    spotifyApi.searchTracks(search, { limit: 5 }).then(
      function (data) {
        setSearchResults(
          data.body.tracks.items.map((track) => {
            const smallestAlbumImage = track.album.images.reduce(
              (smallest, image) => {
                if (image.height < smallest.height) return image;
                return smallest;
              },
              track.album.images[0]
            );

            return {
              artist: track.artists[0].name,
              title: track.name,
              uri: track.uri,
              albumUrl: smallestAlbumImage.url,
              album: track.album.name,
            };
          })
        );
      },
      function (err) {
        console.error(err);
      }
    );

    // spotifyApi.searchTracks('track:Alright artist:Kendrick Lamar').then(
    //   function (data) {
    //     console.log(
    //       'Search tracks by "Alright" in the track name and "Kendrick Lamar" in the artist name',
    //       data.body
    //     );
    //   },
    //   function (err) {
    //     console.log('Something went wrong!', err);
    //   }
    // );
    // spotifyApi.searchArtists('doja cat').then(
    //   function (data) {
    //     console.log('Search artist', data.body);
    //   },
    //   function (err) {
    //     console.error(err);
    //   }
    // );
  }, [search, token]);

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
      console.log(tokenResponse.data);
      spotifyApi.setAccessToken(tokenResponse.data.access_token); // Getting accessToken to spotifyApi is very important!!!
      setToken(tokenResponse.data.access_token);
    });
  }, []);

  //REFERENCE on how to get SEARCH going: https://github.com/WebDevSimplified/spotify-clone/blob/main/client/src/Dashboard.js
  // Spotify API gets expired in around 3600. I think it's better to make a node endpoints specifcially for the refreshed tokens
  return (
    <div className='flex justify-center items-center mt-5 h-screen w-screen'>
      <form value={search} onChange={(e) => setSearch(e.target.value)}>
        <div className='h-auto flex flex-row '>
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
            <div className='overflow-scroll'>
              {searchResults.map((track) => (
                <TrackSearchResult track={track} key={track.uri} />
              ))}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SearchSpot;
