const postcss = require('postcss');
const customProperties = require('postcss-custom-properties');

/* eslint-disable */
onmessage = function(event) {
	console.log(event);
	console.log(postcss);

	// Append the new vars to the end of our template css
	let cssWithAppendedVars = `${this.templateCss.slice(0)} :root {`;
	Object.keys(cssVars).forEach(cssVarKey => {
		cssWithAppendedVars += `\n${cssVarKey}: ${cssVars[cssVarKey].current || cssVars[cssVarKey].value};`;
	});
	cssWithAppendedVars += '}';

	// Transpile the CSS with the appended variables
	return postcss().use(customProperties()).process(cssWithAppendedVars).css;
}
/* eslint-enable */
