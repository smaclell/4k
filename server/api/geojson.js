const createError = require('http-errors');
const fs = require('fs');
const path = require('path');

exports.get = (req, res, next) => {
  const { regionKey } = req.params;
  if (!regionKey) {
    return next(createError(400, 'Missing :regionKey'));
  }

  const filePath = path.join(__dirname, '..', '..', 'data', 'geojson', `${regionKey}.json`);
  return fs.exists(filePath, (exists) => {
    if (!exists) {
      return next(createError(404, 'not found'));
    }

    return res.status(200).sendFile(filePath);
  });
};
