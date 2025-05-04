const request = require('supertest');
const { expect } = require('chai');
const app = require('../app');

describe('GET /my-app', () => {
  it('should return 200 OK and contain expected text', async () => {
    const res = await request(app).get('/my-app');
    expect(res.status).to.equal(200);
    expect(res.text).to.include('Hello');
  });
});

describe('GET /metrics', () => {
  it('should return Prometheus metrics with 200 OK', async () => {
    const res = await request(app).get('/metrics');
    expect(res.status).to.equal(200);
    expect(res.text).to.include('root_access_total');
  });
});

describe('GET /about', () => {
  it('should return 200 and contain descriptive text', async () => {
    const res = await request(app).get('/about');
    expect(res.status).to.equal(200);
    expect(res.text).to.include('Node.js application');
  });
});

describe('GET /ready', () => {
  it('should return 200 OK and Ready message', async () => {
    const res = await request(app).get('/ready');
    expect(res.status).to.equal(200);
    expect(res.text).to.include('Ready');
  });
});

describe('GET /live', () => {
  it('should return 200 OK and Alive message', async () => {
    const res = await request(app).get('/live');
    expect(res.status).to.equal(200);
    expect(res.text).to.include('Alive');
  });
});

describe('GET /classified', () => {
  it('should return 200 OK and classified warning', async () => {
    const res = await request(app).get('/classified');
    expect(res.status).to.equal(200);
    expect(res.text).to.include('not be here');
  });
});
