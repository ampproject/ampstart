const assert = require('assert');
const replaceImportant = require('../lib/index.js');
const fs = require('fs');

describe('replace-important', () => {
  describe('lib', () => {
    it('should have output matching the GOLDEN.css file', () => {
      const testCss = fs.readFileSync('test/test.css').toString();
      const goldenCss = fs.readFileSync('test/GOLDEN.css').toString();
      assert.equal(replaceImportant(testCss), goldenCss);
    });
  });

  // describe('bin', () => {
  //
  // })
});
