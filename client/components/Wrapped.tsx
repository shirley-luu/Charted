import React, { FC, useState, useEffect } from 'react';
import axios from 'axios';

import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import PersonIcon from '@mui/icons-material/Person';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

import { UserInfo } from '../../types/interfaces';
import '../stylesheets/wrapped.scss';

const Wrapped: FC<{userInfo: UserInfo, accessToken: string}> = props => {
  const { userInfo, accessToken } = props;

  const [currentChip, setCurrentChip] = useState('tracks');
  const [topArtists, setTopArtists] = useState([]);
  const [topTracks, setTopTracks] = useState([]);

  const handleChipChange = (chip: string) => setCurrentChip(chip);

  const getTopArtists = async () => {
    const response = await axios.post('api/spotify/top/artists', { accessToken });
    setTopArtists(response.data);
  }

  const getTopTracks = async () => {
    const response = await axios.post('api/spotify/top/tracks', { accessToken });
    setTopTracks(response.data);
  }

  useEffect(() => {  
    if (accessToken.length) {
      getTopArtists();
      getTopTracks();
    }
  }, [accessToken]);

  return (
    <>
      <Stack className='wrapped-chip-stack' direction="row">
        {currentChip === 'tracks' ? (
          <Chip
          sx={{ backgroundColor: 'rgb(145, 172, 154)', marginLeft: '10px' }}
          label="Top Tracks"
          variant="filled"
          onClick={() => handleChipChange("tracks")}
          icon={<AudiotrackIcon color="action" />}
          />
          ) : (
          <Chip sx={{ color: 'black', borderColor: 'black', marginLeft: '10px' }}
          label="Top Tracks"
          variant="outlined"
          onClick={() => handleChipChange("tracks")}
          icon={<AudiotrackIcon color="action" />}
          />
          )
        }
        {currentChip === 'artists' ? (
          <Chip
          sx={{ backgroundColor: 'rgb(145, 172, 154)', marginLeft: '10px' }}
          label="Top Artists"
          variant="filled"
          onClick={() => handleChipChange("artists")}
          icon={<PersonIcon color="action" />}
          />
          ) : (
          <Chip
          sx={{ color: 'black', borderColor: 'black', marginLeft: '10px' }}
          label="Top Artists"
          variant="outlined"
          onClick={() => handleChipChange("artists")}
          icon={<PersonIcon color="action" />}
          />
          )
        }
      </Stack>
      <ImageList sx={{ width: '100%', height: '90%', marginBottom: 'px' }} cols={4}>
        {currentChip === 'artists' ? (
          topArtists.map((artist: any) => (
            <ImageListItem key={artist.name}>
              <img
                className='top-artist-img'
                src={`${artist.imageURL}?w=248&fit=crop&auto=format`}
                srcSet={`${artist.imageURL}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt={`${artist} image`}
                loading="lazy"
              />
              <ImageListItemBar
                title={artist.name}
                subtitle={<span>Genres: {artist.genres.reduce((acc: string, genre: string, i: number) => i !== 0 ? acc += `, ${genre}` : acc += genre, '')}</span>}
                position="below"
              />
            </ImageListItem>
          ))) : (
            topTracks.map((track: any) => (
              <ImageListItem key={track.name}>
                <img
                  width={10}
                  src={`${track.imageURL}?w=248&fit=crop&auto=format`}
                  srcSet={`${track.imageURL}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  alt={`${track} image`}
                  loading="lazy"
                />
                <ImageListItemBar
                  title={track.name}
                  subtitle={<span>Released: {track.releaseDate}</span>}
                  position="below"
                />
              </ImageListItem>
            ))
          )
        }
      </ImageList>
    </>
  );
};

export default Wrapped;