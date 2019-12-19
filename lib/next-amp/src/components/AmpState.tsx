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

type AmpStateProps = {
  id: string;
  src?: string;
};

/**
 * Renders an amp-state element, by either adding local state via `value`
 * or remote state via the `src` property.
 */
const AmpState: React.FunctionComponent<AmpStateProps> = ({children, ...rest}) => (
  <>
    <AmpIncludeCustomElement name='amp-bind' />
    <amp-state {...rest}>
      {children && (
        <script
          type='application/json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(children),
          }}
        />
      )}
    </amp-state>
  </>
);

export default AmpState;
