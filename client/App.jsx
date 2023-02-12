import * as React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';

import Box from '@mui/material/Box';

import Login from './components/Login.jsx';
import NavBar from './components/NavBar.jsx';
import Home from './components/Home.jsx';
import Wrapped from './components/Wrapped.jsx';
import Discover from './components/Discover.jsx';
import './stylesheets/app.scss';

const App = () => {
  const [load, setLoad] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const findSession = async () => {
      const response = await axios('api/user/session');
      if (response.data) setUserInfo(response.data);
    }
    findSession();
    setTimeout(() => setLoad(true), 80);
  }, []);

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
          <Box sx={{ paddingTop: 8 }} ></Box>
          <React.Fragment>
            <BrowserRouter>
              <Routes>
                <Route path= '/' element={<Home userInfo={userInfo} />} />
                <Route path= '/wrapped' element={<Wrapped userInfo={userInfo} />} />
                <Route path= '/discover' element={<Discover userInfo={userInfo} />} />
              </Routes>
            </BrowserRouter>
          </React.Fragment>
        </>
      )
    )
  );
};

export default App;