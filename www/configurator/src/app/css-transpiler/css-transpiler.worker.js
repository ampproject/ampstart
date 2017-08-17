/**
  * @fileoverview Web worker for the CssTranspiler Class, to handle css transpilation.
	* 		Simply responds to messages containing the template CSS, and css vars, and responds with the newly transpiled css.
  */

const postcss = require('postcss');
const customProperties = require('postcss-custom-properties');

// Worker definitions to not follow normal es6 eslint syntax, declaring here
/* global onmessage:true */
/* exported onmessage */
onmessage = function (event) {
  // Check that we have a valid message
  if (!event.data ||
    !event.data.templateCss ||
    !event.data.cssVars) {
    postMessage(false);
    return;
  }

	// Obtain the templateCss and cssvars from event
  const templateCss = event.data.templateCss;
  const cssVars = event.data.cssVars;

	// Append the new vars to the end of our template css
  let cssWithAppendedVars = `${templateCss} \n:root {`;
  Object.keys(cssVars).forEach(cssVarKey => {
    // Ensure we have a valid CSS Variable
    if (cssVars[cssVarKey]) {
      if (cssVars[cssVarKey].current || cssVars[cssVarKey].value) {
        cssWithAppendedVars +=
          `\n${cssVarKey}: ${cssVars[cssVarKey].current || cssVars[cssVarKey].value};`;
      }
    }
  });
  cssWithAppendedVars += '\n}';

  // Transpile the CSS with the appended variables
  postcss().use(customProperties()).process(cssWithAppendedVars).then(result => {
    postMessage(result.css);
  }).catch(error => {
    postMessage(error);
  });
};
