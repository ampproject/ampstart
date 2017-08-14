import ConfiguratorIframe from './app/configurator-iframe/configurator-iframe';
import queryString from 'query-string';
import './index.css';

let params = {};
let templatesPath = '';
let cssPath = '';
if (process.env.NODE_ENV === 'production') {
  templatesPath = '../templates/';
  cssPath = 'uncompiled-css/templates/';
} else {
  templatesPath = 'test-dist/templates/';
  cssPath = 'test-dist/uncompiled-css/templates/';
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
const configuratorIframe = new ConfiguratorIframe(templatesPath, params.template);
console.log(configuratorIframe);
