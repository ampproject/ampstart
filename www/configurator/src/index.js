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

let templatesPath = '';
let cssPath = '';
if (process.env.NODE_ENV === 'production') {
  templatesPath = '../templates/';
  cssPath = 'uncompiled-css/templates/';
} else {
  templatesPath = 'test-dist/templates/';
  cssPath = 'test-dist/uncompiled-css/templates/';
}

function getUrlTemplate() {
  return queryString.parse(location.search.substring(1)).template;
}

function getUrlCssVars() {
  return queryString.parse(location.hash.substring(1));
}

// Define our iframe manager, an our css transplier
let iframeManager = false;
let cssTranspiler = false;

// Grab our CSS and CSS Json
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

// Create the configurator
const templateSrc = `${templatesPath}${getUrlTemplate()}/${getUrlTemplate()}.amp.html#amp=1`;
iframeManager = new IframeManager(templateSrc);
configuratorInit.push(iframeManager.initialize());

Promise.all(configuratorInit).then(responses => {
  // First response will be json, and second shall be css
  cssTranspiler = new CssTranspiler(responses[1], responses[0]);

  // Apply initial styles
  const initialStyles = cssTranspiler.getCssWithVars(getUrlCssVars());
  iframeManager.setStyle(initialStyles);

  // Listen to has change events on the page
  window.addEventListener('hashchange', handleHashChange_);
});

// Define our hash change handler
function handleHashChange_() {
  const updatedStyles = cssTranspiler.getCssWithVars(getUrlCssVars());
  iframeManager.setStyle(updatedStyles);
}
