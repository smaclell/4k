const supertest = require('supertest');
const express = require('express');
const routes = require('../routes');

describe('server/api/regions', () => {
  let agent;
  beforeEach(() => {
    const app = express();
    app.use(routes);

    agent = supertest.agent(app);
  });

  it('gets a known region', async () => {
    const res = await agent.get('/regions/CAN-MAN');

    expect(res.status).to.equal(200);
    expect(res.body).to.deep.equal({
      regionKey: 'CAN-MAN',
      country: 'Canada',
      province: 'Manitoba',
      label: 'Manitoba',
    });
  });

  it('returns 404 on a missing region', async () => {
    const res = await agent.get('/regions/NOT-HPY');

    expect(res.status).to.equal(404);
    expect(res.body).to.deep.equal({ error: 'not found' });
  });
});
