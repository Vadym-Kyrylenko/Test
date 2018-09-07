const request = require('supertest');

const { app } = require('./app');

describe('Express Tests', () => {
  it('should return file index.html', (done) => {
    request(app)
      .get('/')
      .expect(200)
      .end(done);
  });
});
