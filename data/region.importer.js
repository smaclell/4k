/*
  eslint
  no-console: 0,
  import/no-extraneous-dependencies: ["error", { "devDependencies": true }]
*/
const cfs = require('fs');
const path = require('path');
const parse = require('csv-parse/lib/sync');

const content = cfs.readFileSync(path.join(__dirname, 'maps', 'regions.csv'));
const records = parse(content, { columns: true });

const results = {};

records.forEach((record) => {
  const x = parseFloat(record.Cen_x);
  const y = parseFloat(record.Cen_y);

  const region = {
    regionKey: record.WorldID,
    label: record.Zone_Name,
    country: record.Cnty_Name,
  };

  if (Math.abs(x) + Math.abs(y) > 1) {
    region.center = {
      x: parseFloat(record.Cen_x),
      y: parseFloat(record.Cen_y),
    };
  }

  results[region.regionKey] = region;

  let last = '';
  const parts = region.regionKey.split('-');
  for (let i = 0; i < (parts.length - 1); i += 1) {
    if (i > 0) {
      last += '-';
    }
    last += parts[i];
    const part = {
      regionKey: last,
      label: i === 0 ? record.Cnty_Name : record[`Adm${i}_Name`],
      country: record.Cnty_Name,
    };

    results[part.regionKey] = part;
  }
});

cfs.writeFileSync(path.join(__dirname, 'regions.json'), JSON.stringify(results));
