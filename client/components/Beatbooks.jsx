import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

import Stack from '@mui/material/Stack';
import Input from '@mui/joy/Input';

import '../stylesheets/beatbooks.scss';

const Beatbooks = ({ userInfo, accessToken }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  const handleTitleInput = e => setTitle(e.target.value);
  const handleAuthorInput = e => setAuthor(e.target.value);

  console.log(title);
  console.log(author);

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
        </Stack>
      </div>
    </>
  );
};

export default Beatbooks;