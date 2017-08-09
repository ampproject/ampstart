/* eslint-env mocha */
const assert = require('assert');

describe('karma testing', () => {
  it('should pass', () => {
    console.log('hello!');
    assert.equal(true, true);
  });
});
