global.Promise = require('bluebird');
const express = require('express');
const bodyParser = require('body-parser');
const createError = require('http-errors');
const fs = require('fs');
const path = require('path');

const regions = require('../data/regions');

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

app.get('/regions/:regionKey', (req, res, next) => {
  const { regionKey } = req.params;
  if (!regionKey) {
    return next(createError(400, 'Missing :regionKey'));
  }

  const region = regions[regionKey];
  if (!region) {
    return next(createError(404, 'not found'));
  }

  return res.status(200).json(region);
});

app.get('/geojson/:regionKey', (req, res, next) => {
  const { regionKey } = req.params;
  if (!regionKey) {
    return next(createError(400, 'Missing :regionKey'));
  }

  const filePath = path.join(__dirname, '..', 'data', 'geojson', `${regionKey}.json`);
  return fs.exists(filePath, (exists) => {
    if (!exists) {
      return next(createError(404, 'not found'));
    }

    return res.status(200).sendFile(filePath);
  });
});

app.use((req, res, next) => next(createError(404, 'not found')));

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.expose ? err.message : 'unknown' });
});
