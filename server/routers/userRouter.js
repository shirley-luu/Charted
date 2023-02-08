const express = require('express');
const userRouter = express.Router();

const spotifyController = require('../controllers/spotifyController');
const userController = require('../controllers/userController');
const cookieController = require('../controllers/cookieController');
const sessionController = require('../controllers/sessionController');

userRouter.get('/access',
    spotifyController.getAccessToken,
    spotifyController.getUserInfo,
    userController.findUser,
    userController.createUser,
    userController.updateUserRefreshToken,
    cookieController.setTokenCookie,
    cookieController.setSSIDCookie,
    sessionController.startSession,
    (req, res) => {
        return res.status(200).redirect('/');
    }
);

userRouter.get('/session',
    cookieController.getSSIDCookie,
    sessionController.findSession,
    userController.findUser,
    (req, res) => {
        return res.status(200).send(res.locals.userInfo);
    }
);

userRouter.get('/token',
    cookieController.getTokenCookie,
    (req, res) => {
        return res.status(200).send(res.locals.accessToken);
    }
);

userRouter.post('/refresh',
    spotifyController.useRefreshToken,
    cookieController.setTokenCookie,
    (req, res) => {
        console.log(res.locals.accessToken);
        return res.status(200).send(res.locals.accessToken);
    }
);

module.exports = userRouter;