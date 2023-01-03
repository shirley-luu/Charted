const express = require('express');
const spotifyController = require('../controllers/spotifyController');
const spotifyRouter = express.Router();

let PORT;
process.env.NODE_ENV === 'development' ? PORT = 8080 : PORT = 3000;

spotifyRouter.get('/token', spotifyController.token, (req, res) => {
    return res.redirect(`http://localhost:${PORT}/main?${res.locals.auth}`);
})

spotifyRouter.post('/refresh', spotifyController.refresh, (req, res) => {
    return res.status(200).json(res.locals.auth);
})

spotifyRouter.post('/user', spotifyController.user, (req, res) => {
    return res.status(200).json(res.locals.info);
})

module.exports = spotifyRouter;