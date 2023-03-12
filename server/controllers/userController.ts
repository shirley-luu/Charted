import { Request, Response, NextFunction }  from 'express';

import { Options } from '../../types/interfaces';
import { UserController } from '../../types/types';
import User from '../models/userModel';

const options: Options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric"
};

const userController: UserController = {
    findUser: async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (res.locals.userInfo) {
                const { email } = res.locals.userInfo;
                const response = await User.findOne({ email: email });
                if (!response) res.locals.userExists = false;
                else {
                    res.locals.userExists = true;
                    res.locals.userId = response._id.toString();
                }
                return next();
            }
            else {
                const response = await User.findOne({ _id: res.locals.userId });
                if (!response) res.status(200).send(false);
                else res.locals.userInfo = response;
                return next();
            }
        }
        catch(err) {
            return next({
                log: `Error in userController.findUser: ${err}`,
                status: 500,
                message: {err: 'Error occured while looking for user in database'},
              });
        }
    },
    createUser: async (req: Request, res: Response, next: NextFunction) => {
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
    },
    updateUserRefreshToken: async (req: Request, res: Response, next: NextFunction) => {
        if (!res.locals.userExists) return next();
        else {
            const { email } = res.locals.userInfo;
            const { refresh_token } = res.locals.authData;
            const current = new Date();
            const dateTime = current.toLocaleDateString("en-US", options);
            try {
                await User.updateOne({ email: email }, { $set: { refreshToken: refresh_token, lastLoggedIn: dateTime } });
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
    }
};

export default userController;