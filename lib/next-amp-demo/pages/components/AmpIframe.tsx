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
import {AmpIframe, AmpImg} from '@ampproject/toolbox-next-amp';

export const config = {amp: true};

export default () => (
  <AmpIframe
    title='Netflix House of Cards branding: The Stack'
    layout='responsive'
    width='500'
    height='281'
    sandbox='allow-scripts allow-same-origin allow-popups'
    allowfullscreen=''
    frameborder='0'
    src='https://player.vimeo.com/video/140261016'
    className='my-iframe'
  >
    <AmpImg layout='fill' src='https://i.vimeocdn.com/video/536538454_640.webp' placeholder='' />
  </AmpIframe>
);
