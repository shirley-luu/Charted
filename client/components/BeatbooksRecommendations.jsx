import * as React from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

import unavailable from '../assets/unavailable.png';
import '../stylesheets/beatbooksrecommendations.scss';

const BeatbooksRecommendations = ({ userInfo, accessToken }) => {
  const { state } = useLocation();
  const { title, authors, cover } = state;
  
  return (
    <>
      {cover? <img src={cover}></img> : <img src={unavailable} className='unavailable-cover-img'></img>}
      <h4>Title: {title}</h4>
      <h4>{authors.length === 1 ? 'Author: ' : 'Authors: '}{authors.reduce((str, author, i) => i === 0 ? str += author : str += `, ${author}`, '')}</h4>
    </>
  );
};

export default BeatbooksRecommendations;