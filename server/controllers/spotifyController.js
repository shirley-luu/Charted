const axios = require('axios');
const qs = require('qs');

const { client_id, client_secret } = require('../../.env');

const spotifyController = {};

let PORT;
process.env.NODE_ENV === 'development' ? PORT = 8080 : PORT = 3000;

spotifyController.getAccessToken = async (req, res, next) => {
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

spotifyController.getUserInfo = async (req, res, next) => {
    const { access_token } = res.locals.authData;
    const api_endpoint = 'https://api.spotify.com/v1/me';
    try {
        const response = await axios.get(api_endpoint, {
            headers: {
                'Authorization': `Bearer ${access_token}`,
                'Content-Type': 'application/json'
            }
        })
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

module.exports = spotifyController;