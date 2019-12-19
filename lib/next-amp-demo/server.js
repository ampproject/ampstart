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

/**
 * @file a simple express server for serving the Next app for testing.
 */
const next = require('next');
const express = require('express');

const dev = process.env.NODE_ENV !== 'production';
const port = Number.parseInt(process.env.PORT) || dev ? 3000 : 3001;

const server = express();
const app = next({dev, dir: __dirname});

server.get('*', (req, res) => app.getRequestHandler()(req, res));

module.exports = app
  .prepare()
  .then(() => server.listen(port, () => console.log(`Listening on port ${port}`)))
  .catch(e => console.log('error', e));
