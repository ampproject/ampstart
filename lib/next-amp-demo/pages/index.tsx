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

import {NextPage} from 'next';
import * as React from 'react';

export const config = {amp: true};

type Sample = {
  path: string;
  name: string;
};

const Home: NextPage<{samples: Sample[]}> = ({samples}) => {
  return (
    <>
      <h1>Hello Next.js!</h1>
      <ul>
        {samples.map(s => (
          <li>
            <a href={s.path}>{s.name}</a>
          </li>
        ))}
      </ul>
    </>
  );
};

Home.getInitialProps = async ({req}) => {
  return {samples: []};
};

export default Home;
