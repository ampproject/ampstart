import AmpConfigurator from './app/ampConfigurator/ampConfigurator';
import {hello} from './app/hello/hello';
import './index.css';

let templatesPath = '';
if (process.env.NODE_ENV === 'production') {
  templatesPath = '../templates/';
} else {
  templatesPath = 'testTemplates/';
}

// require('postcss-custom-properties')({preserve: true}),
const configurator = new AmpConfigurator();

configurator.setSrc('https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png');
const templateSrc = `${templatesPath}${configurator.params.template}/${configurator.params.template}.amp.html#amp=1`;

configurator.setSrc(templateSrc, () => {
  configurator.setStyle();
});

hello();
