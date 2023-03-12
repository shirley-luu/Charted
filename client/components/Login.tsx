import React, { FC, useState, useEffect } from 'react';

import Button from '@mui/material/Button';
import InfoIcon from '@mui/icons-material/Info';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';

import charted from '../assets/charted.png';
import '../stylesheets/login.scss';

const { client_id } = require('../../.env');

let PORT;
process.env.NODE_ENV === 'development' ? PORT = 8080 : PORT = 3000;

const code_endpoint = 'https://accounts.spotify.com/authorize';
const redirect_uri = `http://localhost:${PORT}/api/user/access`;
const scope = 'user-read-playback-state app-remote-control user-modify-playback-state playlist-read-private user-follow-modify playlist-read-collaborative user-follow-read user-read-currently-playing user-read-playback-position user-library-modify playlist-modify-private playlist-modify-public user-read-email user-top-read streaming user-read-recently-played user-read-private user-library-read';
const login_uri = `${code_endpoint}?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope}&response_type=code&show_dialogue=true`;

const Login: FC = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handlePopoverOpen = (e: React.MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);
  const handlePopoverClose = () => setAnchorEl(null);

  const open = Boolean(anchorEl);

  return (
    <>
      <div className="center-login-div">
        <div className="center-logo-div">
          <img className="login-charted-logo" src={charted} alt="Login page Charted logo"></img>
        </div>
        <div>
          <Button
            variant="contained"
            href={login_uri}
            sx={{
              backgroundColor: "rgb(195, 208, 189)",
              color: "rgb(0, 0, 0)",
              fontWeight: "bold",
              minWidth: "200px",
              marginBottom: "100px",
              width: "225px",
              "&:hover": {
                backgroundColor: "rgb(255, 255, 255)",
                color: "rgb(0, 0, 0)",
              },
            }}
          >
            LOGIN WITH SPOTIFY
          </Button>
        </div>
        <div className="bottom-right-div">
          <Typography
            aria-owns={open ? 'mouse-over-popover' : undefined}
            aria-haspopup="true"
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}
          >
            <InfoIcon sx={{ color: "rgb(255, 255, 255)" }}></InfoIcon>
          </Typography>
          <Popover
            id="mouse-over-popover"
            sx={{
              pointerEvents: 'none'
            }}
            PaperProps={{
              style: {
                backgroundColor: "rgb(145, 171, 158)",
                color: "rgb(255, 255, 255)",
                borderRadius: 15
              }
            }}
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            onClose={handlePopoverClose}
            disableRestoreFocus
          >
            <Typography
              sx={{
                p: 1,
                fontSize: 14
              }}
            >
              This application requires access to your Spotify account via Spotify's Authorization Code Flow.
            </Typography>
          </Popover>
        </div>
      </div>
    </>
  );
};

export default Login;