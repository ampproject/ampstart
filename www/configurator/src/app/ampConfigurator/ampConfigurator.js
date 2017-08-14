// Can only apply styles to iframe if on same domain
// https://stackoverflow.com/questions/217776/how-to-apply-css-to-iframe
// https://stackoverflow.com/questions/6494721/css-override-body-style-for-content-in-iframe

class AmpConfigurator {
  constructor() {
    // Create our iframe
    this.iframe = document.createElement('iframe');
    this.iframe.setAttribute('width', '100%');
    this.iframe.setAttribute('height', '100%');
    document.getElementById('root').appendChild(this.iframe);

    // Create our style object we will be using to ovveride styles in the iframe
    this.style = this.iframe.contentDocument.createElement('style');
    this.iframe.contentDocument.head.appendChild(this.style);
  }

  setSrc(path, iframeLoadedCallback) {
    this.iframe.src = path;
    this.iframe.addEventListener('load', () => {
      if (iframeLoadedCallback) {
        iframeLoadedCallback();
      }
    });
  }

  setStyle(style) {
    if (!style) {
      return;
    }
    this.style.textContent = style;
  }
}

export default AmpConfigurator;
