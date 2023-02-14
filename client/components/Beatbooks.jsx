import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

import Input from '@mui/joy/Input';

const Beatbooks = ({ userInfo, accessToken }) => {
  return (
    <>
      <Input
        sx={{ backgroundColor: 'rgba(128, 158, 130, 0.3)' }}
        color="neutral"
        disabled={false}
        placeholder="Author"
        size="md"
        variant="solid"
      />
    </>
  );
};

export default Beatbooks;