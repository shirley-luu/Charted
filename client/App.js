import * as React from 'react';
import Login from './components/Login';
import Search from './components/Search';
import './styles/styles.scss';

const code = new URLSearchParams(window.location.search).get('code');

const App = () => {
  return (
    <div>
      {code ? <Search code={code} /> : <Login />}
    </div>
  )
}

export default App;