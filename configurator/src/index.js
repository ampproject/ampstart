import {hello} from './app/hello';
import './index.css';

let templatesPath = '';
if (process.env.NODE_ENV === 'production') {
  templatesPath = '../templates/';
} else {
  templatesPath = 'testTemplates/';
}

// Can only apply styles to iframe if on same domain
// https://stackoverflow.com/questions/217776/how-to-apply-css-to-iframe
// https://stackoverflow.com/questions/6494721/css-override-body-style-for-content-in-iframe

class AmpConfigurator {
  constructor() {
    this.iframe = document.createElement('iframe');
    this.iframe.setAttribute('width', '368px');
    this.iframe.setAttribute('height', '600px');
    document.getElementById('root').appendChild(this.iframe);
  }

  setSrc(path, iframeLoadedCallback) {
    this.iframe.src = path;
    this.iframe.addEventListener('load', () => {
      if (iframeLoadedCallback) {
        iframeLoadedCallback();
      }
    });
  }

  setStyle() {
    this.style = this.iframe.contentDocument.createElement('style');
    this.style.textContent = 'body { padding-left: 100px !important; }';
    this.iframe.contentDocument.head.appendChild(this.style);
  }
}

// require('postcss-custom-properties')({preserve: true}),
const configurator = new AmpConfigurator();
configurator.setSrc('https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png');
configurator.setSrc(templatesPath + 'article/article.amp.html#amp=1', () => {
  configurator.setStyle();
});

hello();
