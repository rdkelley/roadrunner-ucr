const express = require('express');
const supertest = require('supertest');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require('../routes/apiRoutes')(app);
require('../routes/htmlRoutes')(app);

const request = supertest(app);

describe('GET /api/shipments', () => {
  it('responds with json and 200 if successful', async (done) => {
    const response = await request.get('/api/shipments');

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Hello World');

    done();
  });
});
