import { Request, Response, NextFunction }  from 'express';

import { SessionController } from '../../types/types';
import Session from '../models/sessionModel';

const sessionController: SessionController = {
    findSession: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = res.locals.userId;
            const session = await Session.findOne({ cookieId: id });
            if (!session) return res.status(200).send(false);
            return next();
        }
        catch(err) {
            return next({
                log: `Error in userController.findSession: ${err}`,
                status: 500,
                message: {err: 'Error occured while looking for user session'},
              });
        }
    },
    startSession: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = res.locals.userId;
            await Session.create({ cookieId: id });
            return next();
        }
        catch(err) {
            return next({
                log: `Error in userController.startSession: ${err}`,
                status: 500,
                message: {err: 'Error occured while starting user session'},
              });
        }
    },
    deleteSession: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = res.locals.userId;
            await Session.deleteOne({ cookieId: id });
            return next();
        }
        catch(err) {
            return next({
                log: `Error in userController.deleteSession: ${err}`,
                status: 500,
                message: {err: 'Error occured while deleting user session'},
              });
        }
    }
};

export default sessionController;