import * as React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';

import Login from './components/Login.jsx';
import NavBar from './components/NavBar.jsx';
import Home from './components/Home.jsx';
import Wrapped from './components/Wrapped.jsx';
import Discover from './components/Discover.jsx';
import './stylesheets/app.scss';

const App = () => {
  const [load, setLoad] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [accessToken, setAccessToken] = useState('');

  const findSession = async () => {
    const response = await axios('api/user/session');
    if (response.data) setUserInfo(response.data);
  }

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
    findSession();
    setTimeout(() => setLoad(true), 80);
  }, []);

  useEffect(() => {
    if (userInfo) findToken();
  }, [userInfo]);
  
  return (
    !load ? (<></>) : (
      !userInfo ? (
        <>
          <React.Fragment>
            <BrowserRouter>
              <Routes>
                <Route path='/' element={<Login />} />
              </Routes>
            </BrowserRouter>
          </React.Fragment>
        </>
      ) : (
        <>
          <NavBar userInfo={userInfo} />
          <React.Fragment>
            <BrowserRouter>
              <Routes>
                <Route path= '/' element={<Home userInfo={userInfo} accessToken={accessToken} />} />
                <Route path= '/wrapped' element={<Wrapped userInfo={userInfo} accessToken={accessToken} />} />
                <Route path= '/discover' element={<Discover userInfo={userInfo} accessToken={accessToken} />} />
              </Routes>
            </BrowserRouter>
          </React.Fragment>
        </>
      )
    )
  );
};

export default App;