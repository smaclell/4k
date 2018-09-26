const createError = require('http-errors');
const fs = require('fs');
const path = require('path');
const geobuf = require('geobuf');
const Pbf = require('pbf');

exports.get = (req, res, next) => {
  const { regionKey } = req.params;
  if (!regionKey) {
    return next(createError(400, 'Missing :regionKey'));
  }

  const filePath = path.join(__dirname, '..', '..', 'data', 'geojson', `${regionKey}.proto`);
  return fs.exists(filePath, (exists) => {
    if (!exists) {
      return next(createError(404, 'not found'));
    }

    return fs.readFile(filePath, (err, data) => {
      if (err) {
        return next(createError(500, 'Could not load geojson'));
      }

      const json = geobuf.decode(new Pbf(data));
      return res.status(200).json(json);
    });
  });
};
