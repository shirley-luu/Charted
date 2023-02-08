import * as React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';

import Login from './components/Login.jsx';
import Main from './components/Main.jsx';

import './stylesheets/app.scss';

const App = () => {
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    const findSession = async () => {
      const response = await axios('api/user/session');
      if (response.data) setUserInfo(response.data);
    }
    findSession();
  }, []);

  return (
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
        <React.Fragment>
          <BrowserRouter>
            <Routes>
              <Route path= '/' element={<Main userInfo={userInfo} />} />
            </Routes>
          </BrowserRouter>
        </React.Fragment>
      </>
    )
  );
};

export default App;