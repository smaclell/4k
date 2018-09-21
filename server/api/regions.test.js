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

  it('lists roots', async () => {
    const res = await agent.get('/regions');

    expect(res.status).to.equal(200);
    expect(res.body).to.have.a.property('_self', '/regions');

    expect(res.body.all).to.deep.include({
      regionKey: 'CAN',
      href: '/regions/CAN',
    });
  });

  it('gets a known region', async () => {
    const res = await agent.get('/regions/CAN-MAN');

    expect(res.status).to.equal(200);
    expect(res.body).to.deep.equal({
      _self: '/regions/CAN-MAN',
      regionKey: 'CAN-MAN',
      country: 'Canada',
      label: 'Manitoba',
      parentRegion: {
        regionKey: 'CAN',
        href: '/regions/CAN',
      },
      center: {
        latitude: -97.3639242589,
        longitude: 55.0593228371,
      },
      children: [],
    });
  });

  it('gets a root region', async () => {
    const res = await agent.get('/regions/ABW');

    expect(res.status).to.equal(200);
    expect(res.body).to.deep.equal({
      _self: '/regions/ABW',
      regionKey: 'ABW',
      country: 'Aruba',
      label: 'Aruba',
      center: {
        latitude: -69.97040134110,
        longitude: 12.51343923630,
      },
      children: [],
    });
  });

  it('gets an intermediate region', async () => {
    const res = await agent.get('/regions/BGD-BAR-BAR');

    expect(res.status).to.equal(200);
    expect(res.body).to.deep.equal({
      _self: '/regions/BGD-BAR-BAR',
      regionKey: 'BGD-BAR-BAR',
      country: 'Bangladesh',
      label: 'Barisal',
      parentRegion: {
        regionKey: 'BGD-BAR',
        href: '/regions/BGD-BAR',
      },
      children: [
        {
          regionKey: 'BGD-BAR-BAR-AGA',
          href: '/regions/BGD-BAR-BAR-AGA',
        },
        {
          regionKey: 'BGD-BAR-BAR-BAB',
          href: '/regions/BGD-BAR-BAR-BAB',
        },
        {
          regionKey: 'BGD-BAR-BAR-BAK',
          href: '/regions/BGD-BAR-BAR-BAK',
        },
        {
          regionKey: 'BGD-BAR-BAR-BAN',
          href: '/regions/BGD-BAR-BAR-BAN',
        },
        {
          regionKey: 'BGD-BAR-BAR-BAR',
          href: '/regions/BGD-BAR-BAR-BAR',
        },
        {
          regionKey: 'BGD-BAR-BAR-GAU',
          href: '/regions/BGD-BAR-BAR-GAU',
        },
        {
          regionKey: 'BGD-BAR-BAR-HIZ',
          href: '/regions/BGD-BAR-BAR-HIZ',
        },
        {
          regionKey: 'BGD-BAR-BAR-MEH',
          href: '/regions/BGD-BAR-BAR-MEH',
        },
        {
          regionKey: 'BGD-BAR-BAR-MUL',
          href: '/regions/BGD-BAR-BAR-MUL',
        },
        {
          regionKey: 'BGD-BAR-BAR-WAZ',
          href: '/regions/BGD-BAR-BAR-WAZ',
        },
      ],
    });
  });

  it('returns 404 on a missing region', async () => {
    const res = await agent.get('/regions/NOT-HPY');

    expect(res.status).to.equal(404);
    expect(res.body).to.deep.equal({ error: 'not found' });
  });
});
