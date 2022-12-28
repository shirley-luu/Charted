import * as React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/Login';
import Search from './components/Search';
import './styles/styles.scss';

const App = () => {
  return (
    <div>
      <React.Fragment>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </BrowserRouter>
      </React.Fragment>
    </div>
  )
}

export default App;