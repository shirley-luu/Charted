import React, { FC, useState, useEffect } from 'react';

import { UserInfo } from '../../types/interfaces';

const Discover: FC<{userInfo: UserInfo, accessToken: string}> = props => {
  const { userInfo, accessToken } = props;

  return (
    <>
      <iframe
        className='web-player'
        src={`https://open.spotify.com/embed/playlist/37i9dQZEVXcIpCTSunjCcZ?utm_source=generator&theme=0`}
        width='100%'
        height='380'
        frameBorder="0"
        allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'
        loading='lazy'
      ></iframe>
    </>
  );
};

export default Discover;