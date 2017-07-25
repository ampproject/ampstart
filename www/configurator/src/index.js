const prettyBytes = require('pretty-bytes');
const browserifyTest = prettyBytes(2424);
console.log('------------------------------');
console.log('Configurator Testing:');
console.log('------------------------------');
console.log('Browserify Test', browserifyTest);
