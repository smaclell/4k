/* eslint import/no-extraneous-dependencies: ["error", { "devDependencies": true }] */
const tj = require('togeojson');
const fs = require('fs');
const path = require('path');
const { DOMParser } = require('xmldom');

const regions = Object.values(require('./regions'));

const findRegion = ({ properties: { Cnty_Name: country, Zone_Name: zone, name } }) => (
  regions.find(r => (
    country === r.country
    && (zone === r.label || name === r.label)
  ))
);

const mapsDir = path.join(__dirname, 'maps');
const files = fs.readdirSync(mapsDir);
files.map((file) => {
  if (!/\.kml$/.test(file)) {
    return [];
  }

  const filePath = path.join(mapsDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  const kml = new DOMParser().parseFromString(content);

  const { features } = tj.kml(kml);
  return features.map((f) => {
    const region = findRegion(f);
    if (!region) {
      return null;
    }

    const geojsonPath = path.join(__dirname, 'geojson', `${region.regionKey}.json`);
    return fs.writeFileSync(geojsonPath, JSON.stringify(f));
  });
});
