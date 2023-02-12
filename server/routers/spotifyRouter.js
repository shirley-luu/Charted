const express = require('express');
const spotifyRouter = express.Router();

const spotifyController = require('../controllers/spotifyController');

spotifyRouter.post('/artists',
    spotifyController.getTopArtists,
    (req, res) => {
        return res.status(201).send(res.locals.topArtists);
    }
);

spotifyRouter.post('/tracks',
    spotifyController.getTopTracks,
    (req, res) => {
        return res.status(201).send(res.locals.topTracks);
    }
);

module.exports = spotifyRouter;