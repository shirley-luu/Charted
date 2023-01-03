import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Home from "./Home";
import Wrapped from "./Wrapped";

const search = new URLSearchParams(window.location.search);

const Main = () => {
  const [accessToken, setAccessToken] = useState(search.get('access_token'));
  const [expiryTime, setExpiryTime] = useState(search.get('expiry_time'));
  const [refreshToken, setRefreshToken] = useState(search.get('refresh_token'));

  useEffect(() => {
    const fetchRefreshToken = async () => {
        const response = await axios.post(`/api/spotify/refresh`, { refreshToken });
        setAccessToken(response.data.access_token);
        setExpiryTime(response.data.expiry_time);
    }
    if (refreshToken && Date.now() >= expiryTime) fetchRefreshToken();
  }, [])

//   console.log('access token: ', accessToken);
//   console.log('refresh token: ', refreshToken);
//   console.log('expires at: ', expiryTime);
//   console.log('expires in: ', expiryTime - Date.now());

  return (
    <div>
      <NavBar accessToken={accessToken} />
      {/* add routes here */}
      <Routes>
        <Route path='/main/home' element={<Home />} />
        <Route path='/main/wrapped' element={<Wrapped />} />
      </Routes>
    </div>
  );
};

export default Main;
