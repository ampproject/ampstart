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
import {FunctionComponent, FormHTMLAttributes} from 'react';
import {AmpIncludeCustomElement} from '../../src-gen/';

/**
 * Renders an amp-form element.
 */
const AmpForm: FunctionComponent<FormHTMLAttributes<HTMLFormElement>> = ({children, ...rest}) => (
  <>
    <AmpIncludeCustomElement name='amp-form' />
    <form {...rest}>{children}</form>
  </>
);

export default AmpForm;
