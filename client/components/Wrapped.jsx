import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Wrapped = ({ userInfo }) => {
  const [accessToken, setAccessToken] = useState('');
  const [topArtists, setTopArtists] = useState([]);
  const [topTracks, setTopTracks] = useState([]);

  const findToken = async () => {
    const response = await axios('api/user/token');
    if (response.data) setAccessToken(response.data);
    else refreshToken();
  }

  const refreshToken = async () => {
    const refreshToken = userInfo.refreshToken;
    const response = await axios.post('api/user/refresh', { refreshToken });
    setAccessToken(response.data);
  }

  const getTopArtists = async () => {
    const response = await axios.post('api/spotify/artists', { accessToken });
    setTopArtists(response.data);
  }

  const getTopTracks = async () => {
    const response = await axios.post('api/spotify/tracks', { accessToken });
    setTopTracks(response.data);
  }

  useEffect(() => {
    findToken();
  }, []);

  useEffect(() => {  
    if (accessToken.length) {
      getTopArtists();
      getTopTracks();
    }
  }, [accessToken]);

  console.log('topArtists: ', topArtists);
  console.log('topTracks: ', topTracks);

  return (
    <>
      {topArtists.map(artist => (
        <div key={artist.name}>
          <img src={artist.imageURL}></img>
          <h5>{artist.name}</h5>
        </div>
      ))}
    </>
  );
};

export default Wrapped;