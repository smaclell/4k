/*
  eslint
  no-console: 0,
  import/no-extraneous-dependencies: ["error", { "devDependencies": true }]
*/
const fs = require('fs');
const path = require('path');
const Pbf = require('pbf');
const geobuf = require('geobuf');

function getRegionGeoJson(regionKey) {
  const filePath = path.join(__dirname, 'geojson', `${regionKey}.proto`);
  const contents = fs.readFileSync(filePath);
  return geobuf.decode(new Pbf(contents));
}

const regionKey = process.argv[process.argv.length - 1];
const geojson = getRegionGeoJson(regionKey);

console.log(JSON.stringify(geojson));
