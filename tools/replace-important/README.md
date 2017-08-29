# replace-important
![Replace-important CLI Usage Gif](http://i.imgur.com/xJYOaMO.gif)

Package for removing !important from css rules from selectors and replacing them inside similar selectors - the new selectors will have the highest specificity in the CSS file. This is useful for making CSS [Supported by AMPHTML](https://www.ampproject.org/docs/guides/responsive/style_pages). This can be used as a CLI or in your Node projects. We also have a [Gulp Plugin](../gulp-replace-important) as well.

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

Try the [Runkit](https://npm.runkit.com/replace-important) from the NPM Page

```javascript
const replaceImportant = require('replace-important');

const output = replaceImportant('body {background-color: red !important;}');

console.log(output); // body {}:root:not(#FK_ID) body{background-color: red }
```

# Tests

There are golden tests, and CLI tests, that are run with:

```
npm run test
```

# Contributing

Please see the [CONTRIBUTING.md](../../CONTRIBUTING.md)

# License
[Apache License 2.0](https://choosealicense.com/licenses/apache-2.0/)
