const express = require('express');
const userRouter = express.Router();

const spotifyController = require('../controllers/spotifyController');
const userController = require('../controllers/userController');
const cookieController = require('../controllers/cookieController');
const sessionController = require('../controllers/sessionController');

userRouter.get('/verify',
    (req, res) => {
        return res.status(200);
    }
);

module.exports = userRouter;