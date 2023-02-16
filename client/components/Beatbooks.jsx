import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Stack from '@mui/material/Stack';
import Input from '@mui/joy/Input';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';

import '../stylesheets/beatbooks.scss';

const Beatbooks = ({ userInfo, accessToken }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [bookInfo, setBookInfo] = useState({});
  const [bookCover, setBookCover] = useState('');

  const navigate = useNavigate();

  const findBook = async () => {
    const response = await axios.post('/api/book/info', { title, author });
    if (response.data) {
      setBookInfo(response.data);
      findBookCover();
    }
  }

  const findBookCover = async (isbn) => {
    const response = await axios.post('/api/book/cover', { title, author });
    if (response.data) setBookCover(response.data);
    navigate('/beatbooks/recommendations', { state: { title, author } });
  }

  const handleTitleInput = e => setTitle(e.target.value);
  const handleAuthorInput = e => setAuthor(e.target.value);
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
            placeholder="Author"
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