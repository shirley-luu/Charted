import express, { Request, Response } from 'express';

import spotifyController from '../controllers/spotifyController';
import userController from '../controllers/userController';
import cookieController from '../controllers/cookieController';
import sessionController from '../controllers/sessionController';

const userRouter = express.Router();

userRouter.get('/access',
    spotifyController.getAccessToken,
    spotifyController.getUserInfo,
    userController.findUser,
    userController.createUser,
    userController.updateUserRefreshToken,
    cookieController.setTokenCookie,
    cookieController.setSSIDCookie,
    sessionController.startSession,
    (req: Request, res: Response) => {
        return res.status(200).redirect('/');
    }
);

userRouter.get('/session',
    cookieController.getSSIDCookie,
    sessionController.findSession,
    userController.findUser,
    (req: Request, res: Response) => {
        return res.status(200).send(res.locals.userInfo);
    }
);

userRouter.get('/token',
    cookieController.getTokenCookie,
    (req: Request, res: Response) => {
        return res.status(200).send(res.locals.accessToken);
    }
);

userRouter.post('/refresh',
    spotifyController.useRefreshToken,
    cookieController.setTokenCookie,
    (req: Request, res: Response) => {
        return res.status(201).send(res.locals.accessToken);
    }
);

userRouter.get('/logout',
    cookieController.deleteSSIDCookie,
    sessionController.deleteSession,
    (req: Request, res: Response) => {
        return res.status(200).redirect('/');
    }
)

export default userRouter;