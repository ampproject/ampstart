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
  * @fileoverview Exports the CssTranspile class. This will be constructed with a templates css as a string, and css variables as json object.
  * It will then allow passing in an object with these variables, to take in the changes, and return the re-transpiled css
  */

// Grab the Worker Using Webpack
// https://github.com/webpack/webpack/tree/master/examples/web-worker
// https://github.com/webpack-contrib/worker-loader
const Worker = require('worker-loader!./css-transpiler.worker');

class CssTranspiler {
  /**
   * @param {string} css - String of the templates page.css file
   * @param {Object} cssVars - Json object of the templates page.json file, containing the css variables as json
   */
  constructor(css, cssVars) {
    this.templateCss = css;
    this.templateCssVars = cssVars;
    // eslint-disable-next-line
    this.worker = new Worker;
  }

  /**
   * Function to retranspile page css with new css vars, using postcss
   * @param {Object} passedCssVars - Json object, where the key represents the css variable to be modified,
   *    and the value represents the variables new value
   * @returns {string} - the newly transpiled page css with varibale values
   */
  getCssWithVars(passedCssVars) {
    // Only assign variables that exist in both, and set to the current value
    const cssVars = Object.assign({}, this.templateCssVars);
    Object.keys(passedCssVars).forEach(cssVarKey => {
      if (cssVars[cssVarKey]) {
        cssVars[cssVarKey].current = passedCssVars[cssVarKey];
      }
    });

    // Add the onmessage here
    this.worker.postMessage({
      templateCss: this.templateCss.slice(0),
      cssVars
    });

    return new Promise(resolve => {
      this.worker.onmessage = event => {
        console.log(event);
        resolve(event);
      };
    });
  }
}

export default CssTranspiler;
