import express, { Request, Response, NextFunction }  from 'express';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

import { ErrObject } from "../types/interfaces";
import userRouter from './routers/userRouter';
import spotifyRouter from './routers/spotifyRouter';
import bookRouter from './routers/bookRouter';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const mongo_uri = process.env.mongo_uri;
const options = { useNewUrlParser: true, useUnifiedTopology: true, dbName: "Charted" };

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/user', userRouter);
app.use('/api/spotify', spotifyRouter);
app.use('/api/book', bookRouter);

mongoose
  .set('strictQuery', true)
  .connect(mongo_uri || '', options)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err: string | null) => console.log(err));

if (process.env.NODE_ENV !== 'development') {
  app.use('/build', express.static(path.resolve('./build')));
  app.get('/', (req: Request, res: Response) => {
    return res.status(200).sendFile(path.resolve('./build/index.html'));
  });
};

app.use((req: Request, res: Response) => res.status(404).send('404'));

app.use((err: ErrObject, req: Request, res: Response, next: NextFunction) => {
  const defaultErr: ErrObject = {
    log: "Express error handler caught unknown middleware error",
    status: 400,
    message: { err: "An error occurred" },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}...`));

export default app;