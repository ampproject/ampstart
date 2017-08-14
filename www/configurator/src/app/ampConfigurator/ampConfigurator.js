// Can only apply styles to iframe if on same domain
// https://stackoverflow.com/questions/217776/how-to-apply-css-to-iframe
// https://stackoverflow.com/questions/6494721/css-override-body-style-for-content-in-iframe

class AmpConfigurator {
  constructor(templatesPath, template) {
    // Create our iframe
    this.iframe = document.createElement('iframe');
    this.iframe.setAttribute('width', '100%');
    this.iframe.setAttribute('height', '100%');
    document.getElementById('root').appendChild(this.iframe);

    // Set our src
    this.template = template;
    const templateSrc = `${templatesPath}${this.template}/${this.template}.amp.html#amp=1`;
    this.setSrc(templateSrc);

    // Create our style object we will be using to ovveride styles in the iframe
    this.style = this.iframe.contentDocument.createElement('style');
    this.iframe.contentDocument.head.appendChild(this.style);
  }

  setStyle(style) {
    if (!style) {
      return;
    }
    this.style.textContent = style;
  }

  setSrc_(path, iframeLoadedCallback) {
    this.iframe.src = path;
    this.iframe.addEventListener('load', () => {
      if (iframeLoadedCallback) {
        iframeLoadedCallback();
      }
    });
  }
}

export default AmpConfigurator;
