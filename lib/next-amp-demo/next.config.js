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

const path = require('path');
const withPlugins = require('next-compose-plugins');
const withCustomBabelConfig = require('next-plugin-custom-babel-config');
const withTranspileModules = require('next-plugin-transpile-modules');

function withCustomWebpack(config = {}) {
  const {webpack} = config;

  config.webpack = (config, ...rest) => {
    // Workaround for issue https://github.com/wellcometrust/next-plugin-transpile-modules/issues/11
    // TODO: upgrade next-plugin-transpile-modules when the issue is fixed
    // TODO: remove this workaround when next-plugin-transpile-modules is upgraded
    config.externals = config.externals || [];

    return webpack(config, ...rest);
  };

  return config;
}

const plugins = [
  [withTranspileModules, {transpileModules: ['@ampproject']}],
  [withCustomBabelConfig, {babelConfigFile: path.resolve('../../babel.config.js')}],
  [withCustomWebpack],
];

const config = {};

module.exports = withPlugins(plugins, config);
