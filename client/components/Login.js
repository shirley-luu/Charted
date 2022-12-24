import * as React from "react";
import Button from "@mui/material/Button";
const { CLIENT_ID } = require('../../.env');

const Login = () => {
  const SPOTIFY_ENDPOINT = 'https://accounts.spotify.com/authorize';
  const REDIRECT_URI = 'http://localhost:8080';
  const SCOPE = 'streaming user-read-private user-read-email';
  
  const LOGIN_URI = `${SPOTIFY_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPE}&response_type=code&show_dialogue=true`;

  return (
    <div>
      <div className="login-center">
        <img className="beatbooks-logo" src="https://hmp.me/d0i8"></img>
        <div>
          <a href={LOGIN_URI} style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "rgb(192, 177, 111)",
                color: "black",
                width: "225px",
                marginTop: "50px",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "rgb(41, 46, 49)",
                  color: "white",
                },
              }}
            >
              LOGIN WITH SPOTIFY
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
