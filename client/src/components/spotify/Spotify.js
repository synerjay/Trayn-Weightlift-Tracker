import React, { useEffect, useState } from 'react';
import Dropdown from './Dropdown';
import axios from 'axios';

function Spotify() {
  const data = [
    { value: 1, name: 'A' },
    { value: 2, name: 'B' },
    { value: 3, name: 'C' },
  ];

  const { REACT_APP_CLIENT_ID, REACT_APP_CLIENT_SECRET } = process.env;

  const [token, setToken] = useState('');

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
      console.log('Successfully Recieve Spotify Token');
      console.log(tokenResponse.data.access_token);
      setToken(tokenResponse.data.access_token);
    });
  }, []);

  return (
    <form onSubmit={() => {}}>
      <div className='container'>
        <Dropdown options={data} />
        <Dropdown options={data} />
        <button type='submit'>Search</button>
      </div>
    </form>
  );
}

export default Spotify;
