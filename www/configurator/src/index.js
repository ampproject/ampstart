/**
 * Copyright 2017 The AMP Start Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

 /**
   * @fileoverview Watches the URL for hash variable changes, creates our configurator iframe, and compiles css on changes
   */

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
