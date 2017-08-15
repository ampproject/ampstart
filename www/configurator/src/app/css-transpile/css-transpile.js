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

const postcss = require('postcss');
const customProperties = require('postcss-custom-properties');

class CssTranspile {
  constructor(css, cssVars) {
    this.templateCss = css;
    this.templateCssVars = cssVars;
  }

  getCssWithVars(passedCssVars) {
    // Only assign variables that exist in both, and set to the current value
    const cssVars = Object.assign({}, this.templateCssVars);
    Object.keys(passedCssVars).forEach(cssVarKey => {
      if (cssVars[cssVarKey]) {
        cssVars[cssVarKey].current = passedCssVars[cssVarKey];
      }
    });

    // Append the new vars to the end of our template css
    let cssWithAppendedVars = `${this.templateCss.slice(0)} :root {`;
    Object.keys(cssVars).forEach(cssVarKey => {
      cssWithAppendedVars += `\n${cssVarKey}: ${cssVars[cssVarKey].current || cssVars[cssVarKey].value};`;
    });
    cssWithAppendedVars += '}';

    // Transpile the CSS with the appended variables
    return postcss().use(customProperties()).process(cssWithAppendedVars).css;
  }
}

export default CssTranspile;
