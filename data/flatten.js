// eslint-disable-next-line import/no-extraneous-dependencies
const got = require('got');
const flatten = require('lodash/flatten');

const client = got.extend({
  json: true,
  baseUrl: 'https://4kmaps.now.sh',
  hooks: {
    afterResponse: [
      (response, retryWithMergedOptions) => {
        if (response.statusCode >= 400 && response.statusCode !== 404) { // Unauthorized
          return retryWithMergedOptions({});
        }

        if (response.statusCode === 404) {
          return false;
        }

        // No changes otherwise
        return response;
      },
    ],
  },
});

async function query(regionPath) {
  const data = await client(`${regionPath}`);

  if (!data) {
    return [];
  }

  if (data.body.children.length === 0) {
    return [data.body.regionKey];
  }

  const results = await Promise.all(data.body.children.map(c => query(c.href)));
  return flatten(results);
}

// eslint-disable-next-line no-console
query(`/regions/${process.argv[2]}`).then(console.log).catch(console.error);
