const express = require('express');
const spotifyRouter = express.Router();

const spotifyController = require('../controllers/spotifyController');

spotifyRouter.post('/top/artists',
    spotifyController.getTopArtists,
    (req, res) => {
        return res.status(201).send(res.locals.topArtists);
    }
);

spotifyRouter.post('/top/tracks',
    spotifyController.getTopTracks,
    (req, res) => {
        return res.status(201).send(res.locals.topTracks);
    }
);

module.exports = spotifyRouter;