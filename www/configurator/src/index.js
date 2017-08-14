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

// Grab our CSS and CSS Json
const cssRequests = [];
const templateCssPath = `${cssPath}${params.template}/page`;
cssRequests.push(
  fetch(`${templateCssPath}.json`).then(response => {
    return response.json();
  })
);
cssRequests.push(
  fetch(`${templateCssPath}.css`).then(response => {
    return response.text();
  })
);

Promise.all(cssRequests).then(responses => {
  // First response will be json, and second shall be css
  console.log(responses);
});

// Create the configurator
const configurator = new AmpConfigurator(templatesPath, params.template);
console.log(configurator);

hello();
