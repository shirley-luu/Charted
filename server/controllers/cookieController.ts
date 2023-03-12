import { Request, Response, NextFunction }  from 'express';

import { CookieController } from '../../types/types';

const cookieController: CookieController = {
    getTokenCookie: (req: Request, res: Response, next: NextFunction) => {
        const token = req.cookies.token;
        if (!token) return res.status(200).send(false);
        else res.locals.accessToken = token;
        return next();
    },
    setTokenCookie: (req: Request, res: Response, next: NextFunction) => {
        const { access_token } = res.locals.authData;
        res.cookie('token', access_token, { httpOnly: true, maxAge: 3540000 });
        res.locals.accessToken = access_token;
        return next();
    },
    getSSIDCookie: (req: Request, res: Response, next: NextFunction) => {
        const id = req.cookies.ssid;
        if (!id) return res.status(200).send(false);
        else res.locals.userId = id;
        return next();
    },
    setSSIDCookie: (req: Request, res: Response, next: NextFunction) => {
        res.cookie('ssid', res.locals.userId, { httpOnly: true });
        return next();
    },
    deleteSSIDCookie: (req: Request, res: Response, next: NextFunction) => {
        const id = req.cookies.ssid;
        if (id) {
            res.locals.userId = id;
            res.clearCookie('ssid');
        }
        return next();
    }
};

export default cookieController;