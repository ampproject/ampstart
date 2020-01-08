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
import {AmpImg, AmpCarousel} from '@ampproject/toolbox-next-amp';

export const config = {amp: true};

export default () => (
  <main>
    <h1>amp-image-lightbox</h1>
    <h2>With AmpImg</h2>
    <AmpImg
      lightbox=''
      src='https://picsum.photos/id/237/300/200'
      width='300'
      height='200'
      layout='responsive'
    />
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
      labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
      laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
      voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
      non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>
    <AmpImg
      lightbox=''
      src='https://picsum.photos/id/236/300/200'
      width='300'
      height='200'
      layout='responsive'
    />
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
      labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
      laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
      voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
      non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>
    <AmpImg
      lightbox=''
      src='https://picsum.photos/id/235/300/200'
      width='300'
      height='200'
      layout='responsive'
    />
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
      labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
      laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
      voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
      non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>

    <h2>With AmpCarousel</h2>
    <AmpCarousel lightbox='' width='400' height='300' layout='responsive' type='slides'>
      <AmpImg
        src='https://picsum.photos/id/234/300/200'
        width='400'
        height='300'
        layout='responsive'
      />
      <AmpImg
        src='https://picsum.photos/id/233/300/200'
        width='400'
        height='300'
        layout='responsive'
      />
      <AmpImg
        src='https://picsum.photos/id/232/300/200'
        width='400'
        height='300'
        layout='responsive'
      />
    </AmpCarousel>
  </main>
);
