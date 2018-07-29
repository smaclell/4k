const fs = require('fs');
const path = require('path');
const regions = require('./regions');

// Check for missing geojson
const missing = Object.keys(regions)
  .map(r => path.join(__dirname, 'geojson', `${r}.json`))
  .filter(p => !fs.existsSync(p));

missing.sort();

// eslint-disable-next-line no-console
missing.forEach(m => console.log(m));
