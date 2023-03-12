import React, { FC, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { UserInfo } from '../../types/interfaces';
import unavailable from '../assets/unavailable.png';
import '../stylesheets/beatbooksrecommendations.scss';

const BeatbooksRecommendations: FC<{userInfo: UserInfo, accessToken: string}> = props => {
  const { userInfo, accessToken } = props;

  const { state } = useLocation();
  const { title, authors, cover } = state;
  
  return (
    <>
      {cover? <img src={cover}></img> : <img src={unavailable} className='unavailable-cover-img'></img>}
      <h4>Title: {title}</h4>
      <h4>{authors.length === 1 ? 'Author: ' : 'Authors: '}{authors.reduce((str: string, author: string, i: number) => i === 0 ? str += author : str += `, ${author}`, '')}</h4>
    </>
  );
};

export default BeatbooksRecommendations;