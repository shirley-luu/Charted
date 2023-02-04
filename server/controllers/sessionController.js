const Session = require("../models/sessionModel");

const sessionController = {};

sessionController.findSession = async (req, res, next) => {
    try {
        const session = await Session.findOne({ cookieId: res.locals.userId });
        if (!session) res.status(200).send(false);
        return next();
    }
    catch(err) {
        return next({
            log: `Error in userController.findSession: ${err}`,
            status: 500,
            message: {err: 'Error occured while looking for user session'},
          });
    }
};

sessionController.startSession = async (req, res, next) => {
    try {
        await Session.create({ cookieId: res.locals.userId });
        return next();
    }
    catch(err) {
        return next({
            log: `Error in userController.startSession: ${err}`,
            status: 500,
            message: {err: 'Error occured while starting user session'},
          });
    }
};

sessionController.deleteSession = async (req, res, next) => {
    try {
        await Session.deleteOne({ cookieId: res.locals.userId });
        return next();
    }
    catch(err) {
        return next({
            log: `Error in userController.deleteSession: ${err}`,
            status: 500,
            message: {err: 'Error occured while deleting user session'},
          });
    }
};

module.exports = sessionController;