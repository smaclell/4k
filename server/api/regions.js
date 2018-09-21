const createError = require('http-errors');
const regions = require('../../data/regions');

exports.get = (req, res, next) => {
  const { regionKey } = req.params;
  if (!regionKey) {
    return next(createError(400, 'Missing :regionKey'));
  }

  const region = regions.lookup[regionKey];
  if (!region) {
    return next(createError(404, 'not found'));
  }

  const response = {
    _self: `/regions/${region.regionKey}`,
    regionKey: region.regionKey,
    label: region.label,
    country: region.country,
  };

  if (region.center) {
    response.center = {
      latitude: region.center.x,
      longitude: region.center.y,
    };
  }

  if (region.parentRegionKey) {
    response.parentRegion = {
      regionKey: region.parentRegionKey,
      href: `/regions/${region.parentRegionKey}`,
    };
  }

  response.children = (region.children || []).map(key => ({
    regionKey: key,
    href: `/regions/${key}`,
  }));

  return res.status(200).json(response);
};
