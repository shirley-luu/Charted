import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const Search = ({ code }) => {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();

  // use effect renders twice due to strict mode
  // useEffect(() => {
  //   const fetchAuthData = async () => {
  //     try {
  //       const auth = await axios.post('/api/spotify/login', { code });
  //       console.log('FE received auth data', auth);
  //       // setAccessToken(auth.data.accessToken);
  //       // setRefreshToken(auth.data.refreshToken);
  //       // setExpiresIn(auth.data.expiresIn);
  //     }
  //     catch(err) {
  //       // window.location= '/';
  //     }
  //   }
  //   fetchAuthData();
  // }, [])

  return (
    <div>
      { code }
    </div>
  );
};

export default Search;
