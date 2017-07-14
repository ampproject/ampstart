import {hello} from './app/hello';
import './index.css';

console.log('sup!');
hello();

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
      iframeLoadedCallback();
    });
  }

  setStyle() {
    const style = this.iframe.contentDocument.createElement('style');
    style.textContent = 'body, html { padding-left: 100px !important; }';
    this.iframe.contentDocument.head.appendChild(style);
    console.log(this.iframe.contentDocument.body.offsetWidth);
    console.log(this.iframe.contentDocument);
    console.log(this.iframe.contentDocument.head);
    console.log(style);
  }
}

const configurator = new AmpConfigurator();
configurator.setSrc('https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png');
configurator.setSrc('templates/article/article.amp.html#amp=1', () => {
  configurator.setStyle();
});
