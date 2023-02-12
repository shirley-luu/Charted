import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Wrapped = ({ userInfo, accessToken }) => {
  const [topArtists, setTopArtists] = useState([]);
  const [topTracks, setTopTracks] = useState([]);

  const getTopArtists = async () => {
    const response = await axios.post('api/spotify/artists', { accessToken });
    setTopArtists(response.data);
  }

  const getTopTracks = async () => {
    const response = await axios.post('api/spotify/tracks', { accessToken });
    setTopTracks(response.data);
  }

  useEffect(() => {  
    if (accessToken.length) {
      getTopArtists();
      getTopTracks();
    }
  }, [accessToken]);

  console.log('topArtists: ', topArtists);
  console.log('topTracks: ', topTracks);

  return (
    <>
      {topArtists.map(artist => (
        <div key={artist.name}>
          <img src={artist.imageURL}></img>
          <h5>{artist.name}</h5>
        </div>
      ))}
    </>
  );
};

export default Wrapped;