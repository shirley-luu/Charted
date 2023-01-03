const axios = require('axios');
const qs = require('qs');
const { client_id, client_secret } = require('../../.env');

const spotifyController = {};

let PORT;
process.env.NODE_ENV === 'development' ? PORT = 8080 : PORT = 3000;

spotifyController.token = async (req, res, next) => {
    const { code } = req.query;
    const token_endpoint = 'https://accounts.spotify.com/api/token';
    const redirect_uri = `http://localhost:${PORT}/api/spotify/token`;
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
        })
        const expiryTime = Date.now() + (response.data.expires_in * 1000);
        const queryParams = qs.stringify(response.data) + `&expiry_time=${expiryTime}`;
        res.locals.auth = queryParams;
        return next();
    }
    catch(err) {
        return next({
            log: `Error in spotifyController.token: ${err}`,
            status: 500,
            message: {err: 'Error occured while retrieving access token'},
          });
    }
}

spotifyController.refresh = async (req, res, next) => {
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
        })
        const expiryTime = Date.now() + (response.data.expires_in * 1000);
        res.locals.auth = response.data;
        res.locals.auth.expiry_time = expiryTime;
        return next();
    }
    catch(err) {
        return next({
            log: `Error in spotifyController.refresh: ${err}`,
            status: 500,
            message: {err: 'Error occured while retrieving refresh token'},
          });
    }
}

spotifyController.user = async (req, res, next) => {
    const { accessToken } = req.body;
    const api_endpoint = 'https://api.spotify.com/v1/me';
    try {
        const response = await axios.get(api_endpoint, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        })
        res.locals.info = response.data;
        return next();
    }
    catch(err) {
        return next({
            log: `Error in spotifyController.user: ${err}`,
            status: 500,
            message: {err: 'Error occured while retrieving user info'},
          });
    }
}

module.exports = spotifyController;