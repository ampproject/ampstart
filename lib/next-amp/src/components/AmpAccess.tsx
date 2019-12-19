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

import * as React from 'react';
import Head from 'next/head';
import {AmpIncludeCustomElement} from '../../src-gen/';

/**
 * Renders an amp-access element.
 */
const AmpAccess: React.FunctionComponent<{}> = ({children}) => (
  <>
    <AmpIncludeCustomElement name='amp-access' />
    <AmpIncludeCustomElement name='amp-analytics' />
    <Head>
      {children && (
        <script
          id='amp-access'
          type='application/json'
          dangerouslySetInnerHTML={{__html: JSON.stringify(children)}}
        />
      )}
    </Head>
  </>
);

export default AmpAccess;
