/**
 * Copyright 2017 The AMP Start Authors. All Rights Reserved.
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

module.exports = {
  src: {
    components: 'components/**/*.*',
    templates: [
      '{templates, dummy}/**/*.html',
      '!templates/**/partials/**/*.html'
    ],
    templateApi: 'templates/*/api/*.json',
    www_pages: 'www/**/*.html',
    hl_partials: 'hl-partials/**/*.html',
    css: ['css/**/*.css'],
    css_ignore: ['!css/**/_*.css', '!css/ampstart-base/**/*.css'],
    data: ['*/**/*.json', '!templates/*/data/*.json'],
    img: 'img/**',
  },
  dest: {
    default: 'dist',
    templates: 'dist',
    templateApi: 'dist/templates',
    www_pages: 'dist',
    hl_partials: 'dist/hl-partials',
    css: 'dist/css/',
    img: 'dist/img/',
    configurator_app: 'dist/configurator',
    uncompiled_css: 'dist/configurator/uncompiledCss'
  },
};
