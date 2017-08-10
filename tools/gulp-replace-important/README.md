# gulp-replace-important

Gulp plugin for [replace-important](../replace-important). Plugin for removing !important from css rules from selectors and replacing them inside similar selectors - the new selectors will have the highest specificity in the CSS file. This is useful for making CSS [Supported by AMPHTML](https://www.ampproject.org/docs/guides/responsive/style_pages). This plugin only supports Buffers, but stream support could be added with [gulp-streamify](https://github.com/nfroidure/gulp-streamify).

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

# License
[Apache License 2.0](https://choosealicense.com/licenses/apache-2.0/)
