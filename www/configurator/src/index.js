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

import IframeManager from './app/iframe-manager/iframe-manager';
import CssTranspiler from './app/css-transpiler/css-transpiler';
import queryString from 'query-string';
import './index.css';

// Define our templates and css URL path depending on the current build environment
let templatesPath = '';
let cssPath = '';
if (process.env.NODE_ENV === 'production') {
  templatesPath = '../templates/';
  cssPath = 'uncompiled-css/templates/';
} else {
  templatesPath = 'test-dist/templates/';
  cssPath = 'test-dist/uncompiled-css/templates/';
}

/**
 * Function to parse the search params of the url, and return the template
 * @returns {string} - the name of the template
 */
function getUrlTemplate() {
  return queryString.parse(location.search.substring(1)).template;
}

/**
 * Function to parse the hash params of the url
 * @returns {string} - the has params of the url
 */
function getUrlCssVars() {
  return queryString.parse(location.hash.substring(1));
}

// Create requests for our CSS vars JSON file, and the template page css file
const configuratorInit = [];
const templateCssPath = `${cssPath}${getUrlTemplate()}/page`;
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

// Instantiate our iframe manager
const templateSrc = `${templatesPath}${getUrlTemplate()}/${getUrlTemplate()}.amp.html#amp=1`;
const iframeManager = new IframeManager(templateSrc);
configuratorInit.push(iframeManager.initialize());

// Declare our cssTranspiler. Need the promises to resolve before instantiation.
let cssTranspiler = false;

Promise.all(configuratorInit).then(responses => {
  // First response will be json, and second shall be css
  cssTranspiler = new CssTranspiler(responses[1], responses[0]);

  // Apply initial styles
  cssTranspiler.getCssWithVars(getUrlCssVars()).then(initialStyles => {
    iframeManager.setStyle(initialStyles);

    // Listen to has change events on the page
    window.addEventListener('hashchange', handleHashChange_);
  });
});

/**
 * Function to handle URL hash changes. This is not used until the initialization of the configurator is completed.
 *    Also, this will simply get the latest URL params, pass them to the transpiler, and set the styles in the iframe manager.
 */
function handleHashChange_() {
  cssTranspiler.getCssWithVars(getUrlCssVars()).then(updatedStyles => {
    iframeManager.setStyle(updatedStyles);
  }).catch(error => {
    // Don't set the styles, log the error
    console.error(error);
  });
}
