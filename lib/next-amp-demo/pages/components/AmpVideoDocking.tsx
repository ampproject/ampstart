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
import {AmpVideo} from '@ampproject/toolbox-next-amp';

export const config = {amp: true};

export default () => (
  <main>
    <h1>amp-video-docking</h1>
    <p>Start the video and scoll down!</p>
    <AmpVideo
      src='https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
      poster='https://peach.blender.org/wp-content/uploads/bbb-splash.png'
      artwork='img/bigbuckbunny.jpg'
      title='Big Buck Bunny'
      album='Blender'
      artist='Blender Foundation'
      width='720'
      height='405'
      layout='responsive'
      controls=''
      dock='#dock-slot'
    />
    <h2>Dummy content</h2>
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
      Vestibulum sit amet posuere sapien. Fusce ac eleifend sapien. Morbi ut vulputate eros, non
      ornare erat. Pellentesque quis mi tempor, venenatis sapien non, eleifend ligula. Lorem ipsum
      dolor sit amet, consectetur adipiscing elit. Aliquam vehicula sem eu massa sollicitudin, quis
      condimentum risus fermentum. Nunc scelerisque posuere nisl ut tempus. Fusce blandit quis
      tortor nec facilisis.
    </p>
    <p>
      Mauris sed neque at erat tristique gravida. Suspendisse pretium rhoncus ante id efficitur.
      Praesent ligula purus, mollis sit amet metus non, pulvinar iaculis eros. Integer et nisi
      rhoncus, aliquet eros non, malesuada urna. Nunc tincidunt felis sed molestie ornare. Vivamus
      est magna, rutrum sit amet erat et, porttitor aliquam elit. Aenean condimentum urna nec urna
      dapibus, ultricies iaculis nisl porttitor. Sed vitae turpis est. Ut purus nibh, suscipit a est
      ut, ullamcorper aliquet velit. Nam egestas urna nec tortor laoreet, eu molestie lectus mattis.
      Pellentesque ut orci dignissim, molestie augue sed, venenatis diam. Curabitur congue metus
      euismod, pretium ligula sit amet, blandit orci. Nulla vel pretium urna. Nullam suscipit nisi
      eget semper pulvinar.
    </p>
    <p>
      Proin non rutrum ipsum. Duis a vestibulum velit, non tincidunt sapien. Orci varius natoque
      penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec condimentum malesuada
      sapien ut aliquet. Donec eleifend metus dui, vel dignissim dolor blandit ac. Quisque nunc
      erat, egestas nec arcu ac, molestie lobortis mauris. Maecenas non sapien eleifend, efficitur
      elit quis, mollis augue. Nunc euismod consectetur orci, sed scelerisque massa facilisis a.
    </p>
    <p>
      Curabitur laoreet in metus fermentum pretium. Nunc pretium iaculis scelerisque. Suspendisse at
      porttitor odio. Sed consequat imperdiet ligula vitae rhoncus. Nullam sagittis dui diam, sit
      amet convallis augue vestibulum in. Etiam in vestibulum eros. Phasellus semper mattis aliquet.
      Donec ac massa eget felis suscipit rhoncus a sed metus. Quisque pharetra feugiat dui, at
      tempor erat volutpat vel. Donec quam ipsum, suscipit quis nisi eu, tincidunt cursus libero.
      Integer sed pulvinar elit. Suspendisse ex nisi, egestas ac ante fringilla, convallis tempor
      ipsum. Quisque est odio, gravida ac malesuada vitae, scelerisque vel quam.
    </p>
    <style jsx>{`
      main {
        max-width: 480px;
        margin: 1rem auto;
      }
    `}</style>
  </main>
);
