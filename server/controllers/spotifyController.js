const axios = require('axios');
const qs = require('qs');

const { client_id, client_secret } = require('../../.env');

const spotifyController = {};

let PORT;
process.env.NODE_ENV === 'development' ? PORT = 8080 : PORT = 3000;

spotifyController.getAccessToken = async (req, res, next) => {
    const { code } = req.query;
    const token_endpoint = 'https://accounts.spotify.com/api/token';
    const redirect_uri = `http://localhost:${PORT}/api/user/access`;
    const auth_token = new Buffer.from(`${client_id}:${client_secret}`).toString('base64');
    const data = qs.stringify({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirect_uri
    })
    try {
        const response = await axios.post(token_endpoint, data, {
            headers: {
                'Authorization': `Basic ${auth_token}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        res.locals.authData = response.data;
        return next();
    }
    catch(err) {
        return next({
            log: `Error in spotifyController.getAccessToken: ${err}`,
            status: 500,
            message: {err: 'Error occured while retrieving access token'},
          });
    }
};

spotifyController.useRefreshToken = async (req, res, next) => {
    const { refreshToken } = req.body;
    const token_endpoint = 'https://accounts.spotify.com/api/token';
    const auth_token = new Buffer.from(`${client_id}:${client_secret}`).toString('base64');
    const data = qs.stringify({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
    })
    try {
        const response = await axios.post(token_endpoint, data, {
            headers: {
                'Authorization': `Basic ${auth_token}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        res.locals.authData = response.data;
        return next();
    }
    catch(err) {
        return next({
            log: `Error in spotifyController.useRefreshToken: ${err}`,
            status: 500,
            message: {err: 'Error occured while retrieving refresh token'},
          });
    }
};

spotifyController.getUserInfo = async (req, res, next) => {
    const { access_token } = res.locals.authData;
    const api_endpoint = 'https://api.spotify.com/v1/me';
    try {
        const response = await axios.get(api_endpoint, {
            headers: {
                'Authorization': `Bearer ${access_token}`,
                'Content-Type': 'application/json'
            }
        });
        res.locals.userInfo = response.data;
        return next();
    }
    catch(err) {
        return next({
            log: `Error in spotifyController.getUserInfo: ${err}`,
            status: 500,
            message: {err: 'Error occured while retrieving user info'},
          });
    }
};

spotifyController.getTopArtists = async (req, res, next) => {
    const { accessToken } = req.body;
    const api_endpoint = 'https://api.spotify.com/v1/me/top/artists';
    try {
        const response = await axios.get(api_endpoint, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });
        const artists = response.data.items.map(artist => {
            return {
                name: artist.name,
                genres: artist.genres,
                popularity: artist.popularity,
                followers: artist.followers.total,
                imageURL: artist.images[0].url,
                spotifyURL: artist.external_urls.spotify
            }
        });
        res.locals.topArtists = artists;
        return next();
    }
    catch(err) {
        return next({
            log: `Error in spotifyController.getTopArtists: ${err}`,
            status: 500,
            message: {err: 'Error occured while retrieving top artists'},
          });
    }
};

spotifyController.getTopTracks = async (req, res, next) => {
    const { accessToken } = req.body;
    const api_endpoint = 'https://api.spotify.com/v1/me/top/tracks';
    try {
        const response = await axios.get(api_endpoint, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });
        const tracks = response.data.items.map(track => {
            return {
                name: track.name,
                artist: track.artists.name,
                releaseDate: track.album.release_date,
                imageURL: track.album.images[0].url,
                spotifyURL: track.external_urls.spotify
            }
        });
        res.locals.topTracks = tracks;
        return next();
    }
    catch(err) {
        return next({
            log: `Error in spotifyController.getTopTracks: ${err}`,
            status: 500,
            message: {err: 'Error occured while retrieving top tracks'},
          });
    }
};

module.exports = spotifyController;