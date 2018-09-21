const supertest = require('supertest');
const express = require('express');
const routes = require('../routes');

describe('server/api/geojson', () => {
  let agent;
  beforeEach(() => {
    const app = express();
    app.use(routes);

    agent = supertest.agent(app);
  });

  it('gets a known region', async () => {
    const res = await agent.get('/geojson/CAN-MAN');

    expect(res.status).to.equal(200);
    expect(res.body.type).to.equal('Feature');
    expect(res.body.geometry).to.include.keys('type', 'geometries');
    expect(res.body.properties).to.deep.equal({
      regionKey: 'CAN-MAN',
    });
  });

  it('returns 404 on a missing region', async () => {
    const res = await agent.get('/geojson/NOT-HPY');

    expect(res.status).to.equal(404);
    expect(res.body).to.deep.equal({ error: 'not found' });
  });
});
