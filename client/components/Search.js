import * as React from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const Search = ({ code }) => {
  const [accessToken, setAccessToken] = React.useState();
  const [expiryTime, setExpiryTime] = React.useState();
  const [refreshToken, setRefreshToken] = React.useState();

  // NTH: save in session for security
  // use effect renders twice due to strict mode
  React.useEffect(() => {
    const search = new URLSearchParams(window.location.search);
    setAccessToken(search.get('access_token'));
    setRefreshToken(search.get('refresh_token'));
    setExpiryTime(search.get('expiry_time'));

    const fetchRefreshToken = async () => {
      const response = await axios.get(`/api/spotify/refresh?refresh_token=${refreshToken}`);
      setAccessToken(response.data.access_token);
      setExpiryTime(response.data.expiry_time);
    }

    if (refreshToken && Date.now() >= expiryTime) fetchRefreshToken();
  }, [])

  console.log('access token: ', accessToken);
  console.log('refresh token: ', refreshToken);
  console.log('expires at: ', expiryTime);
  console.log('expires in: ', expiryTime - Date.now());

  return (
    <div>
      Search
    </div>
  );
};

export default Search;
