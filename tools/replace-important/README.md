# replace-important
[Replace-important CLI Usage Gif](http://i.imgur.com/xJYOaMO.gif)

Package for removing !important from css rules from selectors and replacing them inside similar selectors - the new selectors will have the highest specificity in the CSS file. This is useful to remove any code smells from !important, and for making CSS [Supported by AMPHTML](https://www.ampproject.org/docs/guides/responsive/style_pages). This can be used as a CLI or in your Node projects. We also have a [Gulp Plugin]('../gulp-replace-important') as well.

# Installation

**Globally as CLI**
```
npm install -g replace-important
```

**As a dev dependency to your project**
```
npm install --save-dev replace-important
```

# Usage

**CLI**

```
$ replace-important

    Usage:
      replace-important file.css [OPTIONS]

      Options:
        -h, --help          Print usage information
        -o, --output        Specify output file (Default: output.css)
```

**As a Node Module**

Also, try the [Runkit](https://npm.runkit.com/replace-important) from the NPM Page

```
const replaceImportant = require('replace-important');

const output = replaceImportant('body {background-color: red !important;}');

console.log(output); // body {}:root:not(#FK_ID) body{background-color: red }
```

# Tests

We have a golden test, that is simply run with:

```
npm run test
```

# Contributing

Please see the [CONTRIBUTING.md]('../../CONTRIBUTING.md')

# Credits

Logic for Replace Important done by @camelburrito , Node Module Wrapping and Gulp Plugin done by @torch2424 .

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

# LICENSE
[Apache License 2.0](https://choosealicense.com/licenses/apache-2.0/)
