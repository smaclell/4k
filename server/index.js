global.Promise = require('bluebird');
const express = require('express');
const routes = require('./routes');

const logger = console;
const app = express();

app.use(routes);
app.listen(80, (err) => {
  if (err) {
    return logger.error('something bad happened', { err });
  }

  return logger.info('server is listening on port 80');
});
