import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Discover = ({ userInfo }) => {
  const [accessToken, setAccessToken] = useState('');

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
  
  useEffect(() => {
    findToken();
  }, []);

  return (
    <>
      <iframe
        className='web-player'
        src={`https://open.spotify.com/embed/playlist/37i9dQZEVXcIpCTSunjCcZ?utm_source=generator&theme=0`}
        width='100%'
        height='380'
        frameBorder="0"
        allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'
        loading='lazy'
      ></iframe>
    </>
  );
};

export default Discover;