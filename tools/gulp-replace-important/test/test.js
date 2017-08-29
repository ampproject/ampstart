const assert = require('assert');
const File = require('vinyl');
const fs = require('fs');
const gulpReplaceImportant = require('../');

describe('gulp-replace', function() {

  describe('buffer', function() {

    it('should run the replace-important lib, and match the GOLDEN.css', function(done) {

      // create the fake file
      const fakeFile = new File({
        contents: new Buffer(fs.readFileSync('test/test.css').toString())
      });

      // Get our gulp plugin
      const gulpPlugin = gulpReplaceImportant();

      // Pass the file into the gulp plugin
      gulpPlugin.write(fakeFile);

      gulpPlugin.once('data', (file) => {
        assert(file.isBuffer());

        // Cannot have trailing new line in GOLDEN file to match
        assert.equal(file.contents.toString('utf8'), fs.readFileSync('test/GOLDEN.css').toString('utf8'));
        done();
      });
    });
  });
});
