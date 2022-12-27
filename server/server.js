const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;
const spotifyRouter = require('./routers/spotifyRouter');

// allows for cross origin resource sharing to make requests to different domains
app.use(cors());
// parses incoming request bodies with a JSON payload (unnecessary with axios)
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/api/spotify', spotifyRouter);

// serve files on production mode
if (process.env.NODE_ENV !== 'development') {
  app.use('/build', express.static(path.resolve('./build')));
  app.get('/', (req, res) => {
    return res.status(200).sendFile(path.resolve('./build/index.html'));
  });
}

// catch all handler for all unknown routes
app.use((req, res) => {
  res.status(404).send('404');
});

// global error handler catches all errors
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