import React, { FC, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Stack from '@mui/material/Stack';
import Input from '@mui/joy/Input';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';

import { UserInfo } from '../../types/interfaces';
import '../stylesheets/beatbooks.scss';

const Beatbooks: FC<{userInfo: UserInfo, accessToken: string}> = props => {
  const { userInfo, accessToken } = props;

  const [titleInput, setTitleInput] = useState('');
  const [authorInput, setAuthorInput] = useState('');

  const navigate = useNavigate();

  const findBook = async () => {
    const response = await axios.post('/api/book/info', { title: titleInput, author: authorInput });
    if (response.data) findBookCover(response.data.title, response.data.authors);
  }

  const findBookCover = async (foundTitle: string, foundAuthors: String[]) => {
    const response = await axios.post('/api/book/cover', { title: foundTitle, author: foundAuthors[0] });
    navigate('/beatbooks/recommendations', { state: { title: foundTitle, authors: foundAuthors, cover: response.data } });
  }

  const handleTitleInput = (e: React.ChangeEvent<HTMLInputElement>) => setTitleInput(e.target.value);
  const handleAuthorInput = (e: React.ChangeEvent<HTMLInputElement>) => setAuthorInput(e.target.value);
  const handleRecommendations = () => findBook();

  return (
    <>
      <div className='beatbooks-form-div'>
        <Stack className='beatbooks-form'>
            <Input
            sx={{ backgroundColor: 'rgb(86, 86, 94)', color: 'white', minWidth: '400px', maxWidth: '600px', marginBottom: '10px',  }}
            onChange={handleTitleInput}
            color="neutral"
            disabled={false}
            placeholder="Title"
            size="md"
            variant="solid"
            />
            <Input
            sx={{ backgroundColor: 'rgb(86, 86, 94)', color: 'white', minWidth: '400px', maxWidth: '600px' }}
            onChange={handleAuthorInput}
            color="neutral"
            disabled={false}
            placeholder="Author(s)"
            size="md"
            variant="solid"
            />
            <Button
            sx={{ color: 'white', borderColor: 'white', marginTop: '50px', ':hover': { color: 'rgb(169, 195, 182)', borderColor: 'rgb(169, 195, 182)' } }}
            onClick={handleRecommendations}
            variant="outlined"
            startIcon={<SearchIcon />}
            >
              Find Recommendations
            </Button>
        </Stack>
      </div>
    </>
  );
};

export default Beatbooks;