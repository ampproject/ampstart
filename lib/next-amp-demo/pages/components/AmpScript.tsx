/**
 * Copyright 2019 The AMP HTML Authors. All Rights Reserved.
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

import React from 'react';
import {AmpScript} from '@ampproject/toolbox-next-amp';

export const config = {amp: true};

const Page = props => (
  <>
    <h2>External script</h2>
    <AmpScript
      layout='container'
      src={`${props.host}/static/amp-script/hello.js`}
      className='my-list'
    >
      <button>Hello amp-script!</button>
    </AmpScript>

    <h2>Inline script</h2>
    <AmpScript
      id='hello-world'
      layout='fixed-height'
      height='64'
      script="
        const btn = document.querySelector('button');
        btn.addEventListener('click', () => {
          document.body.textContent = 'Hello World!'
        })
      "
    >
      <button>Hello amp-script!</button>
    </AmpScript>
  </>
);

// amp-script requires absolute URLs, so we create a property `host` which we can use to calculate the script URL.
Page.getInitialProps = async ({req}) => {
  // WARNING: This is a generally unsafe application unless you're deploying to a managed platform like ZEIT Now.
  // Be sure your load balancer is configured to not allow spoofed host headers.
  return {host: `${getProtocol(req)}://${req.headers.host}`};
};

function getProtocol(req) {
  if (req.connection.encrypted) {
    return 'https';
  }
  const forwardedProto = req.headers['x-forwarded-proto'];
  if (forwardedProto) {
    return forwardedProto.split(/\s*,\s*/)[0];
  }
  return 'http';
}

export default Page;
