import AmpConfigurator from './app/ampConfigurator/ampConfigurator';
import {hello} from './app/hello/hello';
import queryString from 'queryString';
import './index.css';

let params = {};
let templatesPath = '';
let cssPath = '';
if (process.env.NODE_ENV === 'production') {
  templatesPath = '../templates/';
  cssPath = 'uncompiledCss/templates/';
} else {
  templatesPath = 'testDist/templates/';
  cssPath = 'testDist/uncompiledCss/templates/';
}

// Define our hash change handler
function handleHashChange_() {
  console.log('Hash Changed, re-building template...');
  params = queryString.parse(location.hash.substring(1));
}
// Handle the beginning hash change, and our event listener
handleHashChange_();
window.addEventListener('hashchange', handleHashChange_);

// require('postcss-custom-properties')({preserve: true}),
// Create the configurator
const configurator = new AmpConfigurator();

// Set the configurator source, and pass a callback for after the src has been set
const templateSrc = `${templatesPath}${params.template}/${params.template}.amp.html#amp=1`;
configurator.setSrc(templateSrc);

// Get our css json
const templateCssJsonPath = `${cssPath}${params.template}/page.json`;
fetch(templateCssJsonPath).then(response => {
  return response.json();
}).then(json => {
  console.log(json);
});

// Get our css string
const templateCssPath = `${cssPath}${params.template}/page.css`;
fetch(templateCssPath).then(response => {
  return response.text();
}).then(css => {
  console.log(css);
});

hello();
