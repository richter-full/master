import 'url-search-params-polyfill';
import scrollToElement from 'scroll-to-element';
import ContentSlot from '../ContentSlot';
import ImageLoader from '../ImageLoader';
import getEventHandlerResize from '../ResizeHandler';
import AsideText from '../AsideText';


const BREAKPOINT_KEYS = window.config.breakpointKeys;
const CONFIG = window.config;
const CONFIG_SCROLL = window.config.generals.scrollConfig;


const spanClass = (viewport) => {
  switch (viewport) {
    case BREAKPOINT_KEYS.xlarge:
      return 3;
    case BREAKPOINT_KEYS.large:
      return 3;
    case BREAKPOINT_KEYS.medium:
      return 4;
    case BREAKPOINT_KEYS.small:
      return 6;
    default:
      return 6;
  }
};

class ArticleRenderer {
  constructor(options = {}) {
    this.element = options.element;
    this.target = options.target;
    this.info = this.element.info;
    this.media = this.element.media;
    this.id = this.element.info.static.hash;
    // this.span = this.spanClass(window.innerWidth);
  }

  init() {
    this.buildTemplate();
  }

  buildTemplate() {
    const imageSources = this.media.images;

    const template = `
      <article
        class="content-overview__item grid-column-span--${spanClass(getEventHandlerResize().getCurrentViewport())} grid-row-span--2"
        id="${this.id}"
        data-id="${this.id}"
      >
        <h1 class="h1">${this.info.static.title}</h1>
        ${this.returnThumbs(imageSources)}
      </article>
    `;
    this.renderInsideTarget(template, this.target);
    window.addEventListener(CONFIG.events.resize, () => this.setLayoutClasses());

  }

  setLayoutClasses() {
    const element = document.getElementById(this.id);
    element.classList.forEach((item) => {
      if (item.startsWith('grid-column-span--')) {
        element.classList.remove(item);
        element.classList.add(`grid-column-span--${spanClass(getEventHandlerResize().getCurrentViewport())}`);
      }
    });
  }

  returnThumbs(imageSources) {
    let template = '';

    Object.entries(imageSources).forEach((imageSource) => {
      const [key, source] = imageSource;
      const imageLoader = new ImageLoader({
        element: source[0],
        article: this.element,
      });
      template += imageLoader.renderThumbTemplate(source[0]);
    });
    return template;
  }

  renderInsideTarget(template, target) {
    target.innerHTML += template;
    window.setTimeout(() => {
      this.initActions();
    }, 100);
  }

  initActions() {
    document.getElementById(this.id).addEventListener('click', () => {
      history.pushState({}, null, `?id=${this.id}`);
      scrollToElement(document.getElementById(this.id), CONFIG_SCROLL);
      console.log(scrollToElement(document.getElementById(this.id), CONFIG_SCROLL));
      const asideText = new AsideText({
        element: document.querySelector('aside'),
        text: this.element.info.static.title,
      });
      asideText.init();

      const contentSlot = new ContentSlot({
        element: this.element,
        article: this.element,
      });
      contentSlot.init();
    });
  }
}

export default ArticleRenderer;
