import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Home = ({userInfo}) => {
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
      <h1>Home</h1>
    </>
  );
};

export default Home;