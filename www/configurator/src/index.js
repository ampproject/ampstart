import AmpConfigurator from './app/ampConfigurator/ampConfigurator';
import {hello} from './app/hello/hello';
import queryString from 'queryString';
import './index.css';

let params = {};
let templatesPath = '';
if (process.env.NODE_ENV === 'production') {
  templatesPath = '../templates/';
} else {
  templatesPath = 'testTemplates/';
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
configurator.setSrc(templateSrc, () => {
  configurator.setStyle();
});

hello();
