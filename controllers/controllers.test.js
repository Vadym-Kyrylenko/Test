const controllers = require('./controllers');

describe('Controllers Tests', () => {
  it('Collection of users from the database into a CSV file and send it', (done) => {
    const expectedResult = __filename;
    const result = controllers.task3();
    if (result !== expectedResult) {
      throw new Error(`Expected ${expectedResult}, but got ${result}`);
    }
    done();
  });
});
