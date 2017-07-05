# [AMP Start](https://ampstart.com/) ⚡

A collection of quick-start templates to build your AMP page quickly and easily.
AMP Start is built on top of [Basscss](http://basscss.com/) a low-level CSS toolkit.


## Workspace Setup

### Installation

1. Install [NodeJS](https://nodejs.org).
2. In the repo directory, run `npm i` command to install the required npm packages.

### Build & Test
| Command                                                                 | Description                                                           |
| ----------------------------------------------------------------------- | --------------------------------------------------------------------- |
| `npm run build`<sup>[[1]](#footnote-1)</sup>                               | Builds the AMP library.                                               |
| `npm run clean`                                                            | Removes build output.                                                 |
| `npm run www`                                                              | Recompile www to build directory.                                     |
| `npm run highlight`                                                        | Build HTML for code highlighting.                                     |
| `npm run watch`<sup>[[1]](#footnote-1)</sup>                               | Watches for changes in files, re-build.                               |
| `npm run serve`                                                            | Serves content in repo root dir over http://localhost:8000/.|

<a id="footnote-1">[1]</a> On Windows, this command must be run as administrator.

### Deploying AMP on Cloud for testing on devices

For deploying and testing local AMP builds on [Firebase](https://firebase.google.com), please follow the steps outlined in this [page](https://firebase.google.com/docs/hosting/deploying). Note that the firebase configuration is already created in the project.

### Repository Layout
| Directory                                                               | Description                                                           |
| ----------------------------------------------------------------------- | --------------------------------------------------------------------- |
|  components/      | CSS and HTML snippets (Mustache) for AMP Start components. |
|  build/           | (generated) intermediate generated files. |
|  css/             | CSS assets. |
|  css/ampstart-base| CSS Base AMP Start elements like buttons. |
|  css/templates    | CSS for AMP Start templates. |
|  css/www          | CSS for www.ampstart.com. |
|  dist/            | (generated). |
|  hl-partials/     | Partials that help generate copy pastable html for www.ampstart.com/components.html. |
|  img/             | Image assets. |
|  tasks/           | Gulp tasks. |
|  templates/       | AMP Start template HTML. |
|  www/             | www.ampstart.com |


## Supported browsers

In general we support the 2 latest versions of major browsers like Chrome, Firefox, Edge, Safari and Opera. We support desktop, phone, tablet and the web view version of these respective browsers.

Beyond that, the core AMP library and builtin elements should aim for very wide browser support and we accept fixes for all browsers with market share greater than 1 percent.

In particular, we try to maintain "it might not be perfect but isn't broken" - support for the Android 4.0 system browser and Chrome 28+ on phones.

## Notes
### amp-mustache
Since ampstart uses the Mustache language to build files, it can conflict with the amp-mustache template. To fix this, use <% instead of {{:
```
  <template type="amp-mustache">
      <%title%>
      <amp-img src="<%imageUrl%>" width="50" height="50"></amp-img>
  </template>
```

# Who makes AMP Start?

AMP Start is made by the [AMP Project](https://www.ampproject.org/), and is licensed
under the [Apache License, Version 2.0](LICENSE).


### [Code of conduct](CODE_OF_CONDUCT.md)
