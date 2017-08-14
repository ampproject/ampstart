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

class ConfiguratorIframe {
  constructor(templatesPath, template) {
    // Create our iframe
    this.iframe = document.createElement('iframe');
    this.iframe.setAttribute('width', '100%');
    this.iframe.setAttribute('height', '100%');
    document.getElementById('root').appendChild(this.iframe);

    // Set our src
    this.template = template;
    const templateSrc = `${templatesPath}${this.template}/${this.template}.amp.html#amp=1`;
    this.setSrc_(templateSrc);

    // Create our style object we will be using to overide styles in the iframe
    this.style = this.iframe.contentDocument.createElement('style');
    this.iframe.contentDocument.head.appendChild(this.style);
  }

  setStyle(style) {
    if (!style) {
      return;
    }
    this.style.textContent = style;
  }

  setSrc_(path, iframeLoadedCallback) {
    this.iframe.src = path;
    this.iframe.addEventListener('load', () => {
      if (iframeLoadedCallback) {
        iframeLoadedCallback();
      }
    });
  }
}

export default ConfiguratorIframe;
