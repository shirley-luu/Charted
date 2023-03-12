import express, { Request, Response } from 'express';

import bookController from '../controllers/bookController';

const bookRouter = express.Router();

bookRouter.post('/info',
    bookController.findBook,
    (req: Request, res: Response) => {
        return res.status(201).send(res.locals.bookInfo);
    }
);

bookRouter.post('/cover',
    bookController.findBookCover,
    (req: Request, res: Response) => {
        return res.status(201).send(res.locals.bookCover);
    }
);

export default bookRouter;