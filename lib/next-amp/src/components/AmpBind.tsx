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
import {AmpIncludeCustomElement} from '../../src-gen/';
import AmpBindProps from '../../src-gen/AmpBindProps';

/**
 * Renders an amp-state element, by either adding local state via `value`
 * or remote state via the `src` property.
 */
const AmpBind: React.FunctionComponent<AmpBindProps> = ({children, ...rest}) => {
  const newProps = {};
  Object.keys(rest).forEach(key => {
    if (/^bind[A-Z]/g.test(key)) {
      const newKey = `data-amp-bind-${key.substring(4).toLowerCase()}`;
      newProps[newKey] = rest[key];
    }
  });
  return (
    <>
      <AmpIncludeCustomElement name='amp-bind' />
      {React.cloneElement(children, newProps)}
    </>
  );
};

export default AmpBind;
