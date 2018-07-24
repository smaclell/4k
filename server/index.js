global.Promise = require('bluebird');
const express = require('express');
const bodyParser = require('body-parser');
const createError = require('http-errors');

const logger = console;
const app = express();

app.listen(80, (err) => {
  if (err) {
    return logger.error('something bad happened', { err });
  }

  return logger.info('server is listening on port 80');
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/status', (req, res) => res.status(200).json({ ok: true }));

app.use((req, res, next) => next(createError(404, 'not found')));

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.expose ? err.message : 'unknown' });
});
