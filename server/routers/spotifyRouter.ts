import express, { Request, Response } from 'express';

import spotifyController from '../controllers/spotifyController';

const spotifyRouter = express.Router();

spotifyRouter.post('/top/artists',
    spotifyController.getTopArtists,
    (req: Request, res: Response) => {
        return res.status(201).send(res.locals.topArtists);
    }
);

spotifyRouter.post('/top/tracks',
    spotifyController.getTopTracks,
    (req: Request, res: Response) => {
        return res.status(201).send(res.locals.topTracks);
    }
);

export default spotifyRouter;