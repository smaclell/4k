const raw = require('./regions.json');

const roots = [];
const lookup = raw;

Object.values(raw).forEach((region) => {
  // eslint-disable-next-line no-param-reassign
  region.children = region.children || [];

  const last = region.regionKey.lastIndexOf('-');
  if (last < 0) {
    // eslint-disable-next-line no-param-reassign
    region.parentRegionKey = null;
    roots.push(region.regionKey);
    return;
  }

  const parentRegionKey = region.regionKey.substr(0, last);

  // eslint-disable-next-line no-param-reassign
  region.parentRegionKey = parentRegionKey;

  const parent = lookup[parentRegionKey];
  parent.children = parent.children || [];
  if (!parent.children.includes(region.regionKey)) {
    parent.children.push(region.regionKey);
  }
});

roots.sort();
Object.values(raw).forEach(region => region.children.sort());

module.exports = {
  roots,
  lookup,
};
