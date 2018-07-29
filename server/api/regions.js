const createError = require('http-errors');
const regions = require('../../data/regions');

exports.get = (req, res, next) => {
  const { regionKey } = req.params;
  if (!regionKey) {
    return next(createError(400, 'Missing :regionKey'));
  }

  const region = regions[regionKey];
  if (!region) {
    return next(createError(404, 'not found'));
  }

  return res.status(200).json(region);
};
