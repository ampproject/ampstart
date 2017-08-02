const assert = require('assert');
const fs = require('fs');
const exec = require('child_process').exec;
const replaceImportant = require('../lib/index.js');

const command = 'node bin/replace-important';
const testCssPath = 'test/test.css';
const goldenCssPath = 'test/GOLDEN.css';
const tmpCssPath = '/tmp/output.css';

describe('replace-important', () => {
  describe('lib', () => {
    it('should have output matching the GOLDEN.css file', () => {
      const testCss = fs.readFileSync(testCssPath).toString();
      const goldenCss = fs.readFileSync(goldenCssPath).toString();
      assert.equal(replaceImportant(testCss), goldenCss);
    });
  });

  describe('bin', () => {
    it('should print usage with no args', () => {
      exec(`${command}`, (error, stdout, stderr) => {
        if (error) {
          console.error('stderr', stderr);
          throw error;
        }

        assert.isOk(stdout.includes('Usage:'));
      });
    });

    it('should print usage with help argument', () => {
      exec(`${command} -h`, (error, stdout, stderr) => {
        if (error) {
          console.error('stderr', stderr);
          throw error;
        }

        assert.isOk(stdout.includes('Usage:'));
      });
    });

    it('should only accept a css file', () => {
      exec(`${command} test/test.js`, (error, stdout, stderr) => {
        assert.isOk(error);
      });
    });

    it('should only accept a single file', () => {
      exec(`${command} test/test.css test/GOLDEN.css`, (error, stdout, stderr) => {
        assert.isOk(error);
      });
    });

    it('should have output matching the GOLDEN.css file, with no ouput path specified', () => {
      exec(`${command} ${testCssPath}`, (error, stdout, stderr) => {
        if (error) {
          console.error('stderr', stderr);
          throw error;
        }

        const defaultCss = fs.readFileSync('output.css').toString();
        const goldenCss = fs.readFileSync(goldenCssPath).toString();

        // Cleanup the file created
        fs.unlinkSync('output.css');

        assert.equal(replaceImportant(defaultCss), goldenCss);
      });
    });

    it('should have output matching the GOLDEN.css file, with specified outputPath', () => {
      exec(`${command} ${testCssPath} -o ${tmpCssPath}`, (error, stdout, stderr) => {
        if (error) {
          console.error('stderr', stderr);
          throw error;
        }

        const tmpCss = fs.readFileSync(tmpCssPath).toString();
        const goldenCss = fs.readFileSync(goldenCssPath).toString();
        assert.equal(replaceImportant(tmpCss), goldenCss);
      });
    });
  });
});
