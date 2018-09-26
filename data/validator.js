/*
  eslint
  no-console: 0,
  import/no-extraneous-dependencies: ["error", { "devDependencies": true }]
*/
const fs = require('fs');
const path = require('path');
const which = require('which-polygon');
const Pbf = require('pbf');
const geobuf = require('geobuf');

const { DUMP } = process.env;

const regions = {};
const data = JSON.parse(fs.readFileSync(DUMP, 'utf8'));

function getRegionGeoJson(regionKey) {
  const filePath = path.join(__dirname, 'geojson', `${regionKey}.proto`);
  const contents = fs.readFileSync(filePath);

  return geobuf.decode(new Pbf(contents));
}

function getMatcher(regionKey) {
  if (regions[regionKey]) {
    return regions[regionKey];
  }

  const geojson = getRegionGeoJson(regionKey);
  regions[regionKey] = which({
    type: 'FeatureCollection',
    features: [
      geojson,
    ],
  });

  return regions[regionKey];
}

Object.values(data.locations).forEach(({
  key,
  regionKey,
  latitude,
  longitude,
}) => {
  if (!regionKey || !latitude || !longitude) {
    return;
  }

  const matcher = getMatcher(regionKey);
  if (!matcher([longitude, latitude])) {
    console.error(`Incorrect region ${regionKey} for ${key}`);
  }
});
