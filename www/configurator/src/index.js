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
import CssTranspile from './app/css-transpile/css-transpile';
import queryString from 'query-string';
import './index.css';

let templatesPath = '';
let cssPath = '';
if (process.env.NODE_ENV === 'production') {
  templatesPath = '../templates/';
  cssPath = 'uncompiled-css/templates/';
} else {
  templatesPath = 'test-dist/templates/';
  cssPath = 'test-dist/uncompiled-css/templates/';
}

// Function to get params on the page
function getUrlParams() {
  const params = {
    search: {},
    hash: {}
  };
  const templateParam = queryString.parse(location.search.substring(1)).template;
  if (templateParam) {
    params.search.template = templateParam;
  }
  params.hash = Object.assign({}, params.hash, queryString.parse(location.hash.substring(1)));
  return params;
}

// Define our iframe manager, an our css transplier
let configuratorIframe = false;
let cssTranspiler = false;
// Get our url params on page load
let params = getUrlParams();
console.log('Initial Params', params);

// Define our hash change handler
function handleHashChange_() {
  console.log('Hash Changed, re-building template...');
  params = getUrlParams();
  const updatedStyles = cssTranspiler.getCssWithVars(params.hash);
  configuratorIframe.setStyle(updatedStyles);
  console.log('New params:', params);
}

// Grab our CSS and CSS Json
const configuratorInit = [];
const templateCssPath = `${cssPath}${params.search.template}/page`;
configuratorInit.push(
  fetch(`${templateCssPath}.json`).then(response => {
    return response.json();
  })
);
configuratorInit.push(
  fetch(`${templateCssPath}.css`).then(response => {
    return response.text();
  })
);

// Create the configurator
const templateSrc = `${templatesPath}${params.search.template}/${params.search.template}.amp.html#amp=1`;
configuratorIframe = new ConfiguratorIframe(templateSrc);
configuratorInit.push(configuratorIframe.initialize());

Promise.all(configuratorInit).then(responses => {
  // First response will be json, and second shall be css
  cssTranspiler = new CssTranspile(responses[1], responses[0]);

  // Apply initial styles
  const initialStyles = cssTranspiler.getCssWithVars(params.hash);
  configuratorIframe.setStyle(initialStyles);

  // Listen to has change events on the page
  window.addEventListener('hashchange', handleHashChange_);
});
