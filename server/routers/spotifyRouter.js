const express = require('express');
const spotifyController = require('../controllers/spotifyController');
const spotifyRouter = express.Router();

let PORT;
process.env.NODE_ENV === 'development' ? PORT = 8080 : PORT = 3000;

spotifyRouter.get('/token', spotifyController.token, (req, res) => {
    return res.redirect(`http://localhost:${PORT}/search?${res.locals.params}`);
})

module.exports = spotifyRouter;