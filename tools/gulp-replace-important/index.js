// Our Required Modules
const PluginError = require('gulp-util').PluginError;
const through = require('through2');
const replaceImportant = require('replace-important');

// consts for the module
const PLUGIN_NAME = 'gulp-replace-important';

function gulpReplaceImportant() {
  return through.obj((file, enc, cb) => {
    if (file.isNull()) {
      // return empty file
      return cb(null, file);
    }
    if (file.isBuffer()) {
      // Run through replace-important
      file.contents = new Buffer(replaceImportant(file.contents.toString()));
    }
    if (file.isStream()) {
      // Streams not supported. Suggest using a tool to convert streams to buffers.
      this.emit('error', new PluginError(PLUGIN_NAME, 'Streams not supported! Try wrapping this plugin in a tool similar to \'gulp-streamify\', to convert your streams into buffers'));
    }

    // Return the converted file
    cb(null, file);
  });
}

module.exports = gulpReplaceImportant;
