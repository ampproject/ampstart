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
import {AmpImg, AmpLayout} from '@ampproject/toolbox-next-amp';

export const config = {amp: true};

export default () => (
  <main>
    <h1>amp-fx-collection</h1>
    <h2>amp-fx on AMP attributes</h2>
    <p>▼ Scroll down.</p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam facilisis odio vitae sem ornare
      laoreet. Mauris sodales convallis eros, non imperdiet mauris ullamcorper eget. Aenean tempus
      augue eu nisl consectetur sagittis. Morbi vel nunc eu leo tristique vehicula. Sed finibus
      velit luctus, scelerisque mauris luctus, tristique justo. Pellentesque non mauris aliquam,
      mattis dui in, gravida lorem. Suspendisse consectetur dui quis quam fringilla pulvinar. Nunc
      sit amet leo porta, tincidunt dui quis, tempus nisl. Suspendisse aliquet, velit ac tincidunt
      finibus, massa mauris scelerisque dolor, sit amet varius mi felis non ante. Ut imperdiet
      auctor diam id ultricies. Phasellus fermentum ligula at luctus sodales. Nulla semper felis at
      tempus sagittis. Curabitur ac risus non turpis sagittis lobortis ut non tortor. Nunc id tempus
      nisi.
    </p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam facilisis odio vitae sem ornare
      laoreet. Mauris sodales convallis eros, non imperdiet mauris ullamcorper eget. Aenean tempus
      augue eu nisl consectetur sagittis. Morbi vel nunc eu leo tristique vehicula. Sed finibus
      velit luctus, scelerisque mauris luctus, tristique justo. Pellentesque non mauris aliquam,
      mattis dui in, gravida lorem. Suspendisse consectetur dui quis quam fringilla pulvinar. Nunc
      sit amet leo porta, tincidunt dui quis, tempus nisl. Suspendisse aliquet, velit ac tincidunt
      finibus, massa mauris scelerisque dolor, sit amet varius mi felis non ante. Ut imperdiet
      auctor diam id ultricies. Phasellus fermentum ligula at luctus sodales. Nulla semper felis at
      tempus sagittis. Curabitur ac risus non turpis sagittis lobortis ut non tortor. Nunc id tempus
      nisi.
    </p>
    <AmpImg
      amp-fx='fade-in'
      width='1600'
      height='900'
      layout='responsive'
      src='https://images.unsplash.com/photo-1524495195760-3266feca5b15?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=7a508f55ae88c8eac7bab9380acded01&auto=format&fit=crop&w=1567&q=80'
    />
    <h2>amp-fx on non-AMP attributes</h2>
    <p>
      The <code>amp-fx</code> attribute is not supported on non AMP elemnts (e.g. <code>div</code>).
      As a workaround, wrap the element in{' '}
      <code>
        &lt;AmpLayout amp-fx=&apos;fade-in&apos; layout=&apos;container&apos;&gt; ...
        &lt;/AmpLayout&gt;
      </code>
      .
    </p>
    <div className='header'>
      <AmpLayout layout='container' amp-fx='parallax' data-parallax-factor='1.3'>
        <h1>
          <span className='title'>Lorem Ipsum</span>
        </h1>
      </AmpLayout>
      <amp-img
        width='1600'
        height='900'
        layout='responsive'
        src='https://images.unsplash.com/photo-1484961361402-1ee9b1c7accb?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=9b58d12098d2e6d4a1199ed426772eb9&auto=format&fit=crop&w=1001&q=80'
      />
    </div>

    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam facilisis odio vitae sem ornare
      laoreet. Mauris sodales convallis eros, non imperdiet mauris ullamcorper eget. Aenean tempus
      augue eu nisl consectetur sagittis. Morbi vel nunc eu leo tristique vehicula. Sed finibus
      velit luctus, scelerisque mauris luctus, tristique justo. Pellentesque non mauris aliquam,
      mattis dui in, gravida lorem. Suspendisse consectetur dui quis quam fringilla pulvinar. Nunc
      sit amet leo porta, tincidunt dui quis, tempus nisl. Suspendisse aliquet, velit ac tincidunt
      finibus, massa mauris scelerisque dolor, sit amet varius mi felis non ante. Ut imperdiet
      auctor diam id ultricies. Phasellus fermentum ligula at luctus sodales. Nulla semper felis at
      tempus sagittis. Curabitur ac risus non turpis sagittis lobortis ut non tortor. Nunc id tempus
      nisi.
    </p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam facilisis odio vitae sem ornare
      laoreet. Mauris sodales convallis eros, non imperdiet mauris ullamcorper eget. Aenean tempus
      augue eu nisl consectetur sagittis. Morbi vel nunc eu leo tristique vehicula. Sed finibus
      velit luctus, scelerisque mauris luctus, tristique justo. Pellentesque non mauris aliquam,
      mattis dui in, gravida lorem. Suspendisse consectetur dui quis quam fringilla pulvinar. Nunc
      sit amet leo porta, tincidunt dui quis, tempus nisl. Suspendisse aliquet, velit ac tincidunt
      finibus, massa mauris scelerisque dolor, sit amet varius mi felis non ante. Ut imperdiet
      auctor diam id ultricies. Phasellus fermentum ligula at luctus sodales. Nulla semper felis at
      tempus sagittis. Curabitur ac risus non turpis sagittis lobortis ut non tortor. Nunc id tempus
      nisi.
    </p>
    <style jsx global>{`
      .header {
        position: relative;
        overflow: hidden;
      }
      .header amp-layout {
        bottom: 10%;
        left: 10px;
        position: absolute;
        z-index: 1;
      }
      .title {
        background-color: black;
        color: white;
        font-size: 2rem;
      }
      main {
        max-width: 480px;
        margin: 1rem auto;
      }
    `}</style>
  </main>
);
