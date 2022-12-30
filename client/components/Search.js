import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const Search = ({ code }) => {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();
  // set state for when current token will expire

  // NTH: save in session for security
  // use effect renders twice due to strict mode
  useEffect(() => {
    const search = new URLSearchParams(window.location.search);
    setAccessToken(search.get('access_token'));
    setRefreshToken(search.get('refresh_token'));
    setExpiresIn(search.get('expires_in'));
    const fetchRefreshToken = async () => {
      const response = await axios.get(`/api/spotify/refresh?refresh_token=${refreshToken}`);
      setAccessToken(response.data.access_token);
    }
    if (refreshToken) fetchRefreshToken();
  }, [])

  console.log('access token: ', accessToken);
  console.log('refresh token: ', refreshToken);
  console.log('expires in: ', expiresIn);

  return (
    <div>
      Search
    </div>
  );
};

export default Search;
