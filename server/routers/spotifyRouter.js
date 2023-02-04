const express = require('express');
const spotifyRouter = express.Router();

const spotifyController = require('../controllers/spotifyController');
const userController = require('../controllers/userController');
const cookieController = require('../controllers/cookieController');
const sessionController = require('../controllers/sessionController');

spotifyRouter.get('/token',
    spotifyController.getAccessToken,
    spotifyController.getUserInfo,
    userController.findUser,
    userController.createUser,
    userController.updateUserRefreshToken,
    cookieController.setTokenCookie,
    cookieController.setSSIDCookie,
    sessionController.startSession,
    (req, res) => {
        return res.redirect('/main');
    }
);

module.exports = spotifyRouter;