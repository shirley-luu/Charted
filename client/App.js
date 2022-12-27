import * as React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/Login';
import Search from './components/Search';
import './styles/styles.scss';

const code = new URLSearchParams(window.location.search).get('code');

const App = () => {
  return (
    <div>
      {/* {code ? <Search code={code} /> : <Login />} */}
      <React.Fragment>
        <BrowserRouter>
          <Routes>
            {/* {!code ?
            <Route path="/" element={<Login />} />
            :
            <Route path="/search" element={<Search code={code} />} />} */}
            <Route path="/" element={<Login />} />
            <Route path="/search" element={<Search code={code} />} />
          </Routes>
        </BrowserRouter>
      </React.Fragment>
    </div>
  )
}

export default App;