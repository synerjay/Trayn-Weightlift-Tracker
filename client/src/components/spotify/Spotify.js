import React, { useEffect, useState } from 'react';
import Dropdown from './Dropdown';
import axios from 'axios';
import Listbox from './Listbox';
import Detail from './Detail';
import SpotifyWebApi from 'spotify-web-api-node';

function Spotify() {
  const [token, setToken] = useState('');
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const [genres, setGenres] = useState({
    selectedGenre: '',
    listOfGenresFromAPI: [],
  });
  const [playlist, setPlaylist] = useState({
    selectedPlaylist: '',
    listOfPlaylistFromAPI: [],
  });
  const [tracks, setTracks] = useState({
    selectedTrack: '',
    listOfTracksFromAPI: [],
  });
  const [trackDetail, setTrackDetail] = useState(null);

  // .env variables in React MUST start with REACT_APP_++ prefix!!!!
  const { REACT_APP_CLIENT_ID, REACT_APP_CLIENT_SECRET } = process.env;

  // New instance of the SpotifyWebApi
  const spotifyApi = new SpotifyWebApi();

  // Testing spotify-web-api node

  useEffect(() => {
    spotifyApi.searchArtists('doja cat').then(
      function (data) {
        console.log('Search artist', data.body);
      },
      function (err) {
        console.error(err);
      }
    );
    spotifyApi.searchTracks('track:Humble artist:Kendrick Lamar').then(
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

      // axios('https://api.spotify.com/v1/browse/categories?locale=sv_US', {
      //   method: 'GET',
      //   headers: { Authorization: 'Bearer ' + tokenResponse.data.access_token },
      // }).then((genreResponse) => {
      //   setGenres({
      //     selectedGenre: genres.selectedGenre,
      //     listOfGenresFromAPI: genreResponse.data.categories.items,
      //   });
      // });
    });
  }, []);

  // Function when a Genre is changed
  const genreChanged = (val) => {
    setGenres({
      selectedGenre: val,
      listOfGenresFromAPI: genres.listOfGenresFromAPI,
    });

    // When a Genre is changed, call to Spotify api to get the corresponding playlist
    axios(
      `https://api.spotify.com/v1/browse/categories/${val}/playlists?limit=10`,
      {
        method: 'GET',
        headers: { Authorization: 'Bearer ' + token },
      }
    ).then((playlistResponse) => {
      setPlaylist({
        selectedPlaylist: playlist.selectedPlaylist,
        listOfPlaylistFromAPI: playlistResponse.data.playlists.items,
      });
    });

    console.log(val);
  };

  // Function when a playlist is changed

  const playlistChanged = (val) => {
    console.log(val);
    setPlaylist({
      selectedPlaylist: val,
      listOfPlaylistFromAPI: playlist.listOfPlaylistFromAPI,
    });
  };

  // Function when the Submit button is clicked

  const buttonClicked = (e) => {
    e.preventDefault();

    axios(
      `https://api.spotify.com/v1/playlists/${playlist.selectedPlaylist}/tracks?limit=10`,
      {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    ).then((tracksResponse) => {
      setTracks({
        selectedTrack: tracks.selectedTrack,
        listOfTracksFromAPI: tracksResponse.data.items,
      });
    });
  };

  // When a track button is clicked on the Listbox component

  const listboxClicked = (val) => {
    //Store the tracks in a constant using spreader array notation
    const currentTracks = [...tracks.listOfTracksFromAPI];

    const trackInfo = currentTracks.filter((t) => t.track.id === val);

    setTrackDetail(trackInfo[0].track);
  };

  return (
    <div className='h-80 w-auto'>
      <form onSubmit={buttonClicked}>
        <div className='h-auto'>
          <Dropdown
            options={genres.listOfGenresFromAPI}
            selectedValue={genres.selectedGenre}
            changed={genreChanged}
          />
          <Dropdown
            options={playlist.listOfPlaylistFromAPI}
            selectedValue={playlist.selectedPlaylist}
            changed={playlistChanged}
          />
          <button type='submit'>Search</button>
        </div>
        <Listbox items={tracks.listOfTracksFromAPI} clicked={listboxClicked} />
        {trackDetail && <Detail {...trackDetail} />}
      </form>
    </div>
  );
}

export default Spotify;
