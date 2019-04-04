import Marquee3k from 'marquee3000';

const ASIDE_TEXTCLASS = 'aside-text';
const MARQUEE_TARGETCLASS = 'aside-text';
const MARQUEE_CONFIG = {
  selector: MARQUEE_TARGETCLASS,
  speed: 1,
  // reverse: true,
}
class AsideText {
  constructor(options = {}) {
    this.element = options.element;
    this.text = options.text || 'Test';
  }

  init() {
    this.initMarquee();
  }

  initMarquee(text = this.text) {
    const asideTemplate = `
      <div class="${ASIDE_TEXTCLASS}"><p>${text}</p></div>
    `;
    this.element.innerHTML = asideTemplate;
  }
}

export default AsideText;
