/* eslint-env mocha */

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
import CssTranspiler from './css-transpiler';

const assert = require('assert');

describe('css-transpiler', () => {
  it('Should be able to be constructed with a valid string, and cssVars Object', () => {
    const cssTranspiler = new CssTranspiler('body { color: --test }', {
      test: {
        value: '#000'
      }
    });
    assert(cssTranspiler);
  });

  it('Should not create a new worker if the the current worker responded', done => {
    const cssTranspiler = new CssTranspiler('body { color: --test }', {
      test: {
        value: '#000'
      }
    });
    // Get a reference to our worker, and run our getCssWithVars() to test if the worker has the same ref
    const currentWorker = cssTranspiler.asyncPostcssWorker.worker;
    cssTranspiler.getCssWithVars({}).then(() => {
      cssTranspiler.getCssWithVars({}).then(() => {
        assert(currentWorker === cssTranspiler.asyncPostcssWorker.worker);
        done();
      });
    });
  });

  it('Should create a new worker if the the current worker did NOT responded', done => {
    const cssTranspiler = new CssTranspiler('body { color: --test }', {
      test: {
        value: '#000'
      }
    });
    // Get a reference to our worker, and run our getCssWithVars() to test worker ref
    const currentWorker = cssTranspiler.asyncPostcssWorker.worker;
    cssTranspiler.asyncPostcssWorker.didRespond = false;
    cssTranspiler.getCssWithVars({}).then(() => {
      assert(currentWorker !== cssTranspiler.asyncPostcssWorker.worker);
      done();
    });
  });

  it('Should response with compiled css with the passed css vars', done => {
    const cssTranspiler = new CssTranspiler('body { color: --test; background-color: --bgcolor; }', {
      test: {
        value: '#000'
      },
      bgColor: {
        value: '#fff'
      }
    });
    cssTranspiler.getCssWithVars({}).then(css => {
      assert(css.includes('#fff'));
      done();
    });
  });

  it('Should replace css vars with the passed css vars, in resolve', done => {
    const cssTranspiler = new CssTranspiler('body { color: --test; background-color: --bgcolor; }', {
      test: {
        value: '#000'
      },
      bgColor: {
        value: '#fff'
      }
    });
    cssTranspiler.getCssWithVars({
      test: '#111'
    }).then(css => {
      assert(css.includes('#111'));
      done();
    });
  });
});
