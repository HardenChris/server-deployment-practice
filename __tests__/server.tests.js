'use strict';

const server = require('../app');
const supertest = require('supertest');
const req = supertest(server.app);

describe('Testing my HTTP server', () => {

  It('Should be able to response to a POST to /message', async () => {
    let res = await req.post('/message?text=test&author=test');

    expect(res.status).toEqual(200);
    expect(res.body[0].text).toEqual('test');
  });
});