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

/* eslint-env jest */

const serverPromise = require('../server');
const fetch = require('node-fetch');
const {writeFileSync, mkdirSync, readFileSync} = require('fs');
const {dirname, join, resolve} = require('path');
const prettier = require('prettier');
const cheerio = require('cheerio');

const glob = require('glob').sync;

const PAGES_DIR = resolve(__dirname, '../pages/');
const OUT_DIR = join(__dirname, 'out');
const OUT_EXT = '.out';
const WRITE_SNAPSHOT = process.env.SNAPSHOT;
if (WRITE_SNAPSHOT) {
  console.log('[INFO] Creating new snapshot');
}

// options is optional
const pagesFiles = glob(PAGES_DIR + '/**/*.tsx').map(f =>
  f.replace(PAGES_DIR, '').replace('.tsx', '')
);

let httpServer;

beforeAll(async () => {
  httpServer = await serverPromise;
});

test.each(pagesFiles)('%s', async pageFile => {
  const res = await fetch(`http://localhost:${httpServer.address().port}${pageFile}`);
  expect(res.status).toBe(200);
  const actual = normalize(await res.text());

  if (WRITE_SNAPSHOT) {
    writeSnapshot(pageFile, actual);
  } else {
    const snapshot = readSnapshot(pageFile);
    expect(actual).toBe(snapshot);
  }
});

afterAll(() => httpServer.close());

function normalize(html) {
  // remove v0.css and boilerplate css to make divs more readable
  const $ = cheerio.load(html);
  const head = $('head');
  ['style[amp-runtime]', 'style[amp-boilerplate]'].forEach(selector => {
    head.find(selector).remove();
  });
  html = $.html();
  html = prettier.format(html, {parser: 'html'});
  return html;
}

function writeSnapshot(path, snapshot) {
  const outFilePath = createOutFilePathFrom(path);
  mkdirSync(dirname(outFilePath), {recursive: true});
  writeFileSync(outFilePath, snapshot, 'utf-8');
}
function readSnapshot(path) {
  const outFilePath = createOutFilePathFrom(path);
  try {
    return readFileSync(outFilePath, 'utf-8');
  } catch (e) {
    // no snapshot yet, return an empty string to show a diff after the test run
    return '';
  }
}

function createOutFilePathFrom(path) {
  return join(OUT_DIR, path + OUT_EXT);
}
