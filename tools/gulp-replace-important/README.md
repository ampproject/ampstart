# gulp-replace-important

Gulp plugin for [replace-important](../replace-important). Plugin for removing !important from css rules from selectors and replacing them inside similar selectors - the new selectors will have the highest specificity in the CSS file. This is useful to remove any code smells from !important, and for making CSS [Supported by AMPHTML](https://www.ampproject.org/docs/guides/responsive/style_pages). This plugin only supports Buffers, but stream support could be added with [gulp-streamify](https://github.com/nfroidure/gulp-streamify).

# Installation

**As a dev dependency to your project**
```
npm install --save-dev gulp-replace-important
```

# Usage

```javascript
const gulp = require('gulp');
const gulpReplaceImportant = require('gulp-replace-important');

/**
* Example:
* Input: body {background-color: red !important;}
*
* Output: body {}:root:not(#FK_ID) body{background-color: red }
*/
gulp.task('css:important', () => {
  return gulp.src('*.css')
    // Validate the input and attach the validation result to the "amp" property
    // of the file object.  
    .pipe(gulpReplaceImportant())
    .pipe(gulp.dest('gulp-replace-important-test'))
});
```

# Tests

Tests can be run with:

```
npm run test
```

# Contributing

Please see the [CONTRIBUTING.md](../../CONTRIBUTING.md)

# Credits

Logic for Replace Important done by [@camelburrito](https://github.com/camelburrito) . Node Module Wrapping, Tests, and Gulp Plugin done by [@torch2424](https://github.com/torch2424) .

````
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
````

# License
[Apache License 2.0](https://choosealicense.com/licenses/apache-2.0/)
