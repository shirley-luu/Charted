import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Wrapped = ({ userInfo }) => {
  const [accessToken, setAccessToken] = useState('');
  const [refreshNeeded, setRefreshNeeded] = useState(false);
  const [topArtists, setTopArtists] = useState([]);
  const [topTracks, setTopTracks] = useState([]);

  useEffect(() => {
    const findToken = async () => {
      const response = await axios('api/user/token');
      if (response.data) setAccessToken(response.data);
      else setRefreshNeeded(true);
    }
    findToken();
  }, []);

  useEffect(() => {
    const refreshToken = async () => {
      const refreshToken = userInfo.refreshToken;
      const response = await axios.post('api/user/refresh', { refreshToken });
      setAccessToken(response.data);
    }
    if (refreshNeeded) refreshToken();
  }, [refreshNeeded]);

  useEffect(() => {
    const getTopArtists = async () => {
      const response = await axios.post('api/spotify/artists', { accessToken });
      setTopArtists(response.data);
    }

    const getTopTracks = async () => {
      const response = await axios.post('api/spotify/tracks', { accessToken });
      setTopTracks(response.data);
    }

    getTopArtists();
    getTopTracks();
  }, [accessToken]);

  console.log('topArtists: ', topArtists);
  console.log('topTracks: ', topTracks);

  return (
    <>
      <h1>Wrapped</h1>
    </>
  );
};

export default Wrapped;