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

const {readdirSync} = require('fs');
const {join} = require('path');

const COMPONENTS_DIR = join(__dirname, '../src/components');
const COMPONENTS_EXT = '.tsx';

const customComponents = new Set();

function generate(config, amp) {
  return `${config.lincenseHeader}

/**
 * @file JSX AMP Component wrappers.
 */

import * as React from "react";

import * as AmpProps from '../src-gen/amp.d';
import Head from 'next/head';
import versionMapping from './versionMapping';

const DEFAULT_ORIGIN = 'https://cdn.ampproject.org/v0/';

type AmpCustomElementProps = {
  name: string;
  origin?: string;
  version?: string;
};

export function AmpIncludeCustomElement(props: AmpCustomElementProps): JSX.Element {
  const origin = props.origin || DEFAULT_ORIGIN;
  const version = props.version || versionMapping(props.name);
  return (
    <Head>
      <script
        async
        custom-element={props.name}
        src={origin + props.name + '-' + version + '.js'}
        key={props.name}
      />
    </Head>
  );
}

export function AmpIncludeCustomTemplate(props: AmpCustomElementProps): JSX.Element {
  const origin = props.origin || DEFAULT_ORIGIN;
  const version = props.version || versionMapping(props.name);
  return (
    <Head>
      <script
        async
        custom-template={props.name}
        src={origin + props.name + '-' + version + '.js'}
        key={props.name}
      />
    </Head>
  );
}

${importCustomComponents()}

${amp.ampTags.map(tag => generateComponent(tag, amp)).join('\n')}

`;
}

function importCustomComponents() {
  const files = readdirSync(COMPONENTS_DIR).filter(f => f.endsWith(COMPONENTS_EXT));
  return files
    .map(componentFile => {
      const component = componentFile.slice(0, -COMPONENTS_EXT.length);
      customComponents.add(component);
      return `export {default as ${component}} from '../src/components/${component}';`;
    })
    .join('\n');
}

function generateComponent(tag, amp) {
  // don't generate components if a custom one exists
  if (customComponents.has('Amp' + tag.camelCase)) {
    return;
  }
  // auto generate a component
  const propsName = `Amp${tag.camelCase}ComponentProps`;
  const parentPropsName = `AmpProps.Amp${tag.camelCase}Props`;
  return `

export interface ${propsName} extends ${parentPropsName} {
  className?: string
}

/**
 * Imports the ${tag.name} element.
 */
export const Amp${
    tag.camelCase
  }: React.FunctionComponent<${propsName}> = ({className, children, ...props}) => {
  const requiredExtensions = new Map<string, Record<string, string>>();
  if (Object.keys(props).some(key => key.startsWith('data-amp-bind-'))) {
    ${toSetMapString('amp-bind', amp)}
  }
  ${tag.requiresExtension.map(e => toSetMapString(e, amp)).join(';\n')}
  ${getAttributesWithExtension(tag)
    .map(
      attr => `if (props['${attr.name}'] != undefined) {
      ${attr.requiresExtension.map(e => toSetMapString(e, amp)).join(';\n')}
    }`
    )
    .join('')}
  return (<>
    {Array.from(requiredExtensions.values()).map(e => (<AmpIncludeCustomElement name={e.name} version={e.version} />))}
      <${tag.name} class={className} {...props}>
        {children}
      </${tag.name}>
    </>);
  };
`;
}

function toSetMapString(extName, amp) {
  const ext = amp.getExtensionByName(extName);
  return `requiredExtensions.set('${ext.name}', ${toObjectString(ext, amp)})`;
}

function toObjectString(ext, amp) {
  return `{
    name: '${ext.name}',
    version: '${ext.version}',
  }`;
}

function getAttributesWithExtension(tag) {
  return tag.attrs.filter(a => a.requiresExtension && a.requiresExtension.length > 0);
}

module.exports = generate;
