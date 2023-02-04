import * as React from 'react';
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './components/Login.jsx';
import Main from './components/Main.jsx';

import './stylesheets/app.scss';

const App = () => {
  return (
    <>
      <React.Fragment>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path= '/main' element={<Main />} />
          </Routes>
        </BrowserRouter>
      </React.Fragment>
    </>
  );
};

export default App;