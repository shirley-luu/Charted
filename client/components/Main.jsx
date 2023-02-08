import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Main = ({userInfo}) => {
  const [accessToken, setAccessToken] = useState('');
  const [refreshNeeded, setRefreshNeeded] = useState(false);

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
  
  return (
    <>
      <h1>you logged in</h1>
      <h2>username: {userInfo.username}</h2>
      <h2>email: {userInfo.email}</h2>
      <h4>refreshToken: {userInfo.refreshToken}</h4>
      <h4>accessToken: {accessToken}</h4>
    </>
  );
};

export default Main;