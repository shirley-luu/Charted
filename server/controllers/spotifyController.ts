import { Request, Response, NextFunction }  from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import qs from 'qs';

import { SpotifyController } from '../../types/types';

dotenv.config();
const { client_id, client_secret } = process.env;

let PORT: number;
process.env.NODE_ENV === 'development' ? PORT = 8080 : PORT = 3000;

const spotifyController: SpotifyController = {
    getAccessToken: async (req: Request, res: Response, next: NextFunction) => {
        const { code } = req.query;
        const token_endpoint = 'https://accounts.spotify.com/api/token';
        const redirect_uri = `http://localhost:${PORT}/api/user/access`;
        const auth_token = new (Buffer as any).from(`${client_id}:${client_secret}`).toString('base64');
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
    },
    useRefreshToken: async (req: Request, res: Response, next: NextFunction) => {
        const { refreshToken } = req.body;
        const token_endpoint = 'https://accounts.spotify.com/api/token';
        const auth_token = new (Buffer as any).from(`${client_id}:${client_secret}`).toString('base64');
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
    },
    getUserInfo: async (req: Request, res: Response, next: NextFunction) => {
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
    },
    getTopArtists: async (req, res, next) => {
        const { accessToken } = req.body;
        const api_endpoint = 'https://api.spotify.com/v1/me/top/artists';
        try {
            const response = await axios.get(api_endpoint, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            });
            const artists = response.data.items.map((artist: any) => {
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
    },
    getTopTracks: async (req, res, next) => {
        const { accessToken } = req.body;
        const api_endpoint = 'https://api.spotify.com/v1/me/top/tracks';
        try {
            const response = await axios.get(api_endpoint, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            });
            const tracks = response.data.items.map((track: any) => {
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
    }
};

export default spotifyController;