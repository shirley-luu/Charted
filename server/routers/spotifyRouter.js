const express = require('express');
const spotifyController = require('../controllers/spotifyController');
const spotifyRouter = express.Router();

spotifyRouter.get('/callback', spotifyController.login, (req, res) => {
    console.log('auth: ', res.locals.auth);
    return res.status(200).json(res.locals.auth);
})

module.exports = spotifyRouter;