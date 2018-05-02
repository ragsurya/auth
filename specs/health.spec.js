const test = require ('ava');
const request = require('supertest');
const app = require('../server/index');

test('check ping status', async t => {
    const response = await request(app)
    .get('/ping');
    t.is(response.status, 200)

})