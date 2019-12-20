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

const {mkdirSync, existsSync, writeFileSync} = require('fs');
const {join} = require('path');
const prettier = require('prettier');
const loadAmp = require('./amp');

const generateTypes = require('./generateTypes.js');
const generateComponents = require('./generateComponents');
const generateVersionMapping = require('./generateVersionMapping');

const prettierConfig = require('../../../prettier.config.js');

const config = {
  importHelper: 'AmpCustomElement.tsx',
  componentWrapper: 'index.tsx',
  versionMapping: 'versionMapping.ts',
  typeDefinition: 'amp.d.tsx',
  dist: join(__dirname, '../src-gen/'),
  lincenseHeader: `/**
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
 */`,
};

async function build() {
  if (!existsSync(config.dist)) {
    mkdirSync(config.dist);
  }

  const amp = await loadAmp();

  const typeDefinitions = generateTypes(config, amp);
  writeFile(config.typeDefinition, typeDefinitions);

  const componentWrapper = generateComponents(config, amp);
  writeFile(config.componentWrapper, componentWrapper);

  const versionMapping = generateVersionMapping(config, amp);
  writeFile(config.versionMapping, versionMapping);
}

function writeFile(name, content) {
  content = prettier.format(content, prettierConfig);
  writeFileSync(join(config.dist, name), content, 'utf-8');
}

build();
