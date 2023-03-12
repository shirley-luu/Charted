import React, { FC, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';

import { UserInfo } from '../types/interfaces';
import Login from './components/Login';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Wrapped from './components/Wrapped';
import Discover from './components/Discover';
import Beatbooks from './components/Beatbooks';
import BeatbooksRecs from './components/BeatbooksRecs';
import cat from './assets/cat.gif';
import './stylesheets/app.scss';

const App: FC = () => {
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [accessToken, setAccessToken] = useState('');

  const findSession = async () => {
    const response = await axios('api/user/session');
    if (response.data) setUserInfo(response.data);
  };

  const findToken = async () => {
    const response = await axios('api/user/token');
    if (response.data) setAccessToken(response.data);
    else refreshToken();
  };

  const refreshToken = async () => {
    const refreshToken = userInfo?.refreshToken;
    const response = await axios.post('api/user/refresh', { refreshToken });
    setAccessToken(response.data);
  };

  useEffect(() => {
    findSession();
    setTimeout(() => setLoading(false), 1000);
  }, []);

  useEffect(() => {
    if (userInfo) findToken();
  }, [userInfo]);
  
  return (
    loading ? (
      <>
        <div className='center-loading-div'>
          <img className='loading-cat' src={cat}></img>
        </div>
      </>
    ) :
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
              <Route path= '/beatbooks' element={<Beatbooks userInfo={userInfo} accessToken={accessToken} />} />
              <Route path= '/beatbooks/recommendations' element={<BeatbooksRecs userInfo={userInfo} accessToken={accessToken} />} />
            </Routes>
          </BrowserRouter>
        </React.Fragment>
      </>
    )
  );
};

export default App;