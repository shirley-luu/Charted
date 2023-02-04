const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require("mongoose");
const app = express();

const spotifyRouter = require('./routers/spotifyRouter');

const { mongo_uri } = require('../.env');

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/spotify', spotifyRouter);

mongoose
  .set('strictQuery', true)
  .connect(mongo_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "Charted"
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

// serve files on production mode
if (process.env.NODE_ENV !== 'development') {
  app.use('/build', express.static(path.resolve('./build')));
  app.get('/', (req, res) => {
    return res.status(200).sendFile(path.resolve('./build/index.html'));
  });
};

// unknown route handler
app.use((req, res) => res.status(404).send('404'));

// global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: "Express error handler caught unknown middleware error",
    status: 400,
    message: { err: "An error occurred" },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}...`));

module.exports = app;