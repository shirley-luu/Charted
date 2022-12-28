import * as React from "react";
import Button from "@mui/material/Button";

const { client_id } = require('../../.env');

let PORT;
process.env.NODE_ENV === 'development' ? PORT = 8080 : PORT = 3000;

const Login = () => {
  const code_endpoint = 'https://accounts.spotify.com/authorize';
  const redirect_uri = `http://localhost:${PORT}/api/spotify/token`;
  const scope = 'streaming user-read-private user-read-email';
  const login_uri = `${code_endpoint}?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope}&response_type=code&show_dialogue=true`;

  return (
    <div>
      <div className="login-center">
        <img className="beatbooks-logo" src="https://hmp.me/d0i8"></img>
        <div>
          <a href={login_uri} style={{ textDecoration: "none" }}>
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
