const User = require('../models/userModel');

const userController = {};

const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric"
};

userController.findUser = async (req, res, next) => {
    const { display_name, email } = res.locals.userInfo;
    try {
        const response = await User.findOne({ username: display_name, email: email });
        if (!response) res.locals.userExists = false;
        else {
            res.locals.userExists = true;
            res.locals.userId = response._id.toString();
        }
        return next();
    }
    catch(err) {
        return next({
            log: `Error in userController.findUser: ${err}`,
            status: 500,
            message: {err: 'Error occured while looking for user in database'},
          });
    }
};

userController.createUser = async (req, res, next) => {
    if (res.locals.userExists) return next();
    else {
        const { display_name, email } = res.locals.userInfo;
        const image = res.locals.userInfo.images[0].url;
        const { refresh_token } = res.locals.authData;
        const current = new Date();
        const dateTime = current.toLocaleDateString("en-US", options);
        try {
            const response = await User.create({ username: display_name, email: email, imageURL: image, refreshToken: refresh_token, lastLoggedIn: dateTime });
            res.locals.userId = response._id.toString();
            return next();
        }
        catch(err) {
            return next({
                log: `Error in userController.createUser: ${err}`,
                status: 500,
                message: {err: 'Error occured while creating user in database'},
              });
        }
    }
};

userController.updateUserRefreshToken = async (req, res, next) => {
    if (!res.locals.userExists) return next();
    else {
        const { display_name, email } = res.locals.userInfo;
        const { refresh_token } = res.locals.authData;
        const current = new Date();
        const dateTime = current.toLocaleDateString("en-US", options);
        try {
            await User.updateOne({ username: display_name, email: email }, { $set: { refreshToken: refresh_token, lastLoggedIn: dateTime } });
            return next();
        }
        catch(err) {
            return next({
                log: `Error in userController.updateUserRefreshToken: ${err}`,
                status: 500,
                message: {err: 'Error occured while updating user refresh token in database'},
              });
        }
    }
};

module.exports = userController;