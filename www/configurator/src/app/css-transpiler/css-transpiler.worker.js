/* eslint-disable */
const postcss = require('postcss');
const customProperties = require('postcss-custom-properties');

onmessage = function(event) {

	// Obtain the templateCss and cssvars from event
	const templateCss = event.data.templateCss;
	const cssVars = event.data.cssVars;

	// Append the new vars to the end of our template css
	let cssWithAppendedVars = `${templateCss} \n:root {`;
	Object.keys(cssVars).forEach(cssVarKey => {
		cssWithAppendedVars += `\n${cssVarKey}: ${cssVars[cssVarKey].current || cssVars[cssVarKey].value};`;
	});
	cssWithAppendedVars += '\n}';

	// Transpile the CSS with the appended variables
	postMessage(postcss().use(customProperties()).process(cssWithAppendedVars).css);
}
/* eslint-enable */
