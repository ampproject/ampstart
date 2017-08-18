/* eslint-env mocha */

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
import IframeManager from './iframe-manager';

const assert = require('assert');

const iframeSrc = 'about:blank';

// Create / Destroy the container for our iframe, Before and after each test
let root;
let ampCustomStyle;

beforeEach(() => {
  root = document.createElement('div');
  root.id = 'root';
  document.body.appendChild(root);

  ampCustomStyle = document.createElement('style');
  ampCustomStyle.setAttribute('amp-custom', true);
  document.head.appendChild(ampCustomStyle);
});

afterEach(() => {
  document.body.removeChild(root);
  document.head.removeChild(ampCustomStyle);
});

describe('Iframe Manager', () => {
  it('Should be able to be constructed with a valid string, and cssVars Object', () => {
    const iframeManager = new IframeManager(iframeSrc);
    assert(iframeManager);
  });

  it('Should be able to set and load the iframe from initialize()', done => {
    const iframeManager = new IframeManager(iframeSrc);
    iframeManager.initialize().then(() => {
      assert(iframeManager.iframe.src === iframeSrc);
      done();
    });
  });

  it('Should set the iframe\'s style element', done => {
    const iframeManager = new IframeManager(iframeSrc);
    iframeManager.initialize().then(() => {
      iframeManager.styleElement = ampCustomStyle;
      const css = 'body { background-color: red; }';
      iframeManager.setStyle(css);

      assert(iframeManager.styleElement.textContent === css);
      done();
    });
  });
});
