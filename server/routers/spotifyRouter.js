const express = require('express');
const spotifyRouter = express.Router();

const spotifyController = require('../controllers/spotifyController');

// spotifyRouter.post('/artists',
//     spotifyController.getTopArtists,
//     (req, res) => {
//         console.log(res.locals.topArtists);
//         return res.status(201).send(res.locals.topArtists);
//     }
// );

module.exports = spotifyRouter;