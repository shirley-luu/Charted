import React, { FC, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { UserInfo } from '../../types/interfaces';

const Home: FC<{userInfo: UserInfo, accessToken: string}> = props => {
  const { userInfo, accessToken } = props;

  const location = useLocation().pathname;

  console.log(location);

  return (
    <>
      <h1>Home</h1>
    </>
  );
};

export default Home;