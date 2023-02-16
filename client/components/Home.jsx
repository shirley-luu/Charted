import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const Home = ({ userInfo, accessToken }) => {
  const location = useLocation().pathname;

  console.log(location);

  return (
    <>
      <h1>Home</h1>
    </>
  );
};

export default Home;