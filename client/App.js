import * as React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/Login';
import Main from './components/Main';
import './styles/styles.scss';

const App = () => {
  return (
    <div>
      <React.Fragment>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path= "/main" element={<Main />} />
          </Routes>
        </BrowserRouter>
      </React.Fragment>
    </div>
  )
}

export default App;