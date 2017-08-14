import queryString from 'queryString';

// Can only apply styles to iframe if on same domain
// https://stackoverflow.com/questions/217776/how-to-apply-css-to-iframe
// https://stackoverflow.com/questions/6494721/css-override-body-style-for-content-in-iframe

class AmpConfigurator {
  constructor() {
    // Create our iframe
    this.iframe = document.createElement('iframe');
    this.iframe.setAttribute('width', '368px');
    this.iframe.setAttribute('height', '600px');
    document.getElementById('root').appendChild(this.iframe);

    // Handle the beginning hash change, and our event listener
    this.handleHashChange_();
    window.addEventListener('hashchange', this.handleHashChange_);
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

  handleHashChange_() {
    console.log('Hash Changed, re-building template...');
    this.params = queryString.parse(location.hash.substring(1));
  }
}

export default AmpConfigurator;
