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

import {NextPage} from 'next';
import * as React from 'react';
import {AmpMustache, AmpList, AmpIncludeCustomElement} from '@ampproject/toolbox-next-amp';

export const config = {amp: true};

const initialItems = {
  items: [
    {
      name: 'amp.dev',
      url: 'https://amp.dev',
    },
    {
      name: 'Next.js',
      url: 'https://nextjs.org',
    },
  ],
};

const AmpMustacheSample: NextPage<{}> = () => {
  const template = (
    <AmpMustache>
      {`{{#items}}`}
      <div>
        <a href='{{url}}'>{`{{name}}`}</a>
      </div>
      {`{{/items}}`}
    </AmpMustache>
  );

  return (
    <>
      <AmpIncludeCustomElement name='amp-bind' />
      <AmpList
        layout='fixed-height'
        data-amp-bind-is-layout-container='context'
        height='0'
        single-item=''
        items='.'
        data-amp-bind-src='context'
      >
        {template}
      </AmpList>
      <div data-amp-bind-hidden='context != undefined'>
        {AmpMustache.render(template, initialItems)}
      </div>
      <button
        on="tap:AMP.setState({
          context: {
            items: [
              {
                name: 'Google',
                url: 'https://google.com',
              },
              {
                name: 'Bing',
                url: 'https://bing.com',
              },
            ]
          }
      })"
      >
        Click to re-render
      </button>
    </>
  );
};

export default AmpMustacheSample;
