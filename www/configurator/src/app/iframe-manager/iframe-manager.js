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
  * @fileoverview Exports the ConfiguratorIframe class. This will create an ifram element on the page, and assign its src to a template.
  * It also allows for passing in a string of styles to be applied to the iframe, to change the styles of the template real time.
  */

// Can only apply styles to iframe if on same domain
// https://stackoverflow.com/questions/217776/how-to-apply-css-to-iframe
// https://stackoverflow.com/questions/6494721/css-override-body-style-for-content-in-iframe

class IframeManager {
  /**
   * @param {string} templateSrc - the url of the template to be loaded
   */
  constructor(templateSrc) {
    // Create our iframe
    this.iframe = document.createElement('iframe');
    this.iframe.setAttribute('width', '100%');
    this.iframe.setAttribute('height', '100%');
    document.getElementById('root').appendChild(this.iframe);

    // Set our passed constructor params
    this.templateSrc = templateSrc;
  }

  /**
   * Funciton to apply the templateSrc to the [src] attribute, and obtain the amp-custom style element for use
   * @returns {Promise}
   */
  initialize() {
    return new Promise(resolve => {
      // Set the iframe src
      this.iframe.src = this.templateSrc;
      // Create our style object we will be using to overide styles in the iframe
      this.iframe.addEventListener('load', () => {
        this.styleElement = this.iframe.contentDocument.head.querySelector('style[amp-custom]');
        resolve();
      });
    });
  }

  /**
   * Funciton to apply the styles to the iframe amp-custom style element.
   * @param {string} style - a string of the css to be placed within the style element
   */
  setStyle(style) {
    if (!style) {
      return;
    }
    this.styleElement.textContent = style;
  }
}

export default IframeManager;
