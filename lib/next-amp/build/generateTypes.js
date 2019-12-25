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

const {toCamelCase} = require('./strings');
const intrinsicElements = require('./intrinsic-elements.json');

function generate(config, amp) {
  return `${config.lincenseHeader}
/* eslint-disable @typescript-eslint/interface-name-prefix */


/**
 * @file AMPHTML type definitions for AMP tags and additional AMP specific HTML tag attributes.
 */

import * as React from 'react';

declare module 'react' {
  
  // Add type attribute for <template type=amp-mustache>. There's no template specific type definition
  // included with React. 
  interface HTMLAttributes<T> {
    type?: any;
  }
  
  type Booleanish = boolean | 'true' | 'false';

${amp.tags.map(generateInterfaces).join('\n')}
}

${amp.ampTags.map(generateAmpInterfaces).join('\n')}

declare global {
  namespace JSX {
    interface IntrinsicElements {
    ${amp.ampTags.map(generateTypes).join('\n')}
    }
  }
}
`;
}

function generateInterfaces(tag) {
  return `
  interface ${interfaceName(tag)}<T> extends HTMLAttributes<T> {
  ${tag.attrs.map(a => createTypeAttribute(a, tag)).join(';\n')}
  }
  `;
}

function interfaceName(tag) {
  return `${toCamelCase(tag.name)}HTMLAttributes`;
}

function generateAmpInterfaces(tag) {
  const tagTypeName = toCamelCase(tag.name) + 'Props';
  return `
export interface ${tagTypeName} {
  children?: React.ReactNode,
${tag.attrs.map(a => createTypeAttribute(a, tag)).join(',\n')}
}`;
}

function generateTypes(tag) {
  const tagTypeName = 'Amp' + tag.camelCase + 'Props';
  return `'${tag.name}': ${tagTypeName};`;
}

function createTypeAttribute(attr, tag) {
  const name = attr.name;
  return `  '${name}'${attr.mandatory ? '' : '?'}: ${inferType(attr, tag)}`;
}

function inferType(attr, tag) {
  if (!tag.isAmpTag) {
    // re-use react type definitions for non-AMP tags
    const intrinsicElement =
      intrinsicElements[interfaceName(tag)] || intrinsicElements['HTMLAttributes'];
    if (intrinsicElement && intrinsicElement[attr.name]) {
      return intrinsicElement[attr.name];
    }
  }
  if (attr.name === 'layout' && tag.supportedLayouts) {
    return tag.supportedLayouts.map(l => `"${l.toLowerCase().replace('_', '-')}"`).join(' | ');
  }
  if (['width', 'height', 'size', 'tabindex', 'rowspan', 'colspan'].includes(attr.name)) {
    return 'string | number';
  }
  if (
    ['noloading', 'placeholder'].includes(attr.name) ||
    (attr.value && attr.value.length === 1 && attr.value[0] === '')
  ) {
    return `'' | '${attr.name}'`;
  }
  if (attr.value && attr.value.length > 0) {
    return []
      .concat(attr.value.map(l => l.toLowerCase()))
      .map(l => `"${l}"`)
      .join(' | ');
  }
  return 'string';
}

module.exports = generate;
