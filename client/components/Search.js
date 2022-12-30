import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const Search = ({ code }) => {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiryTime, setExpiryTime] = useState();

  // NTH: save in session for security
  // use effect renders twice due to strict mode
  useEffect(() => {
    const search = new URLSearchParams(window.location.search);
    setAccessToken(search.get('access_token'));
    setRefreshToken(search.get('refresh_token'));
    setExpiryTime(search.get('expiry_time'));

    const fetchRefreshToken = async () => {
      const response = await axios.get(`/api/spotify/refresh?refresh_token=${refreshToken}`);
      setAccessToken(response.data.access_token);
      // set expiry time for refresh token
    }

    if (refreshToken && Date.now() >= expiryTime) fetchRefreshToken();
  }, [])

  console.log('access token: ', accessToken);
  console.log('refresh token: ', refreshToken);
  console.log('expires at: ', expiryTime);
  console.log('expires in: ', expiryTime - Date.now());

  return (
    <div>
      Search
    </div>
  );
};

export default Search;
