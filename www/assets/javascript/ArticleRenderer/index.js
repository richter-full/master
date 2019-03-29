import arrayFrom from 'array-from';
import ContentSlot from '../ContentSlot';
import ImageLoader from '../ImageLoader';

class ArticleRenderer {
  constructor(options = {}) {
    this.element = options.element;
    this.target = options.target;
    this.info = this.element.info;
    this.media = this.element.media;
    this.id = this.element.info.static.hash;
  }

  init() {
    // console.log('Article Renderer Initialized with: ', this.element, this.info, this.media, this.id);
    this.buildTemplate();
  }

  buildTemplate() {
    const imageSources = this.media.images;

    const template = `
      <article
        class="content-overview__item"
        id="${this.id}"
        data-id="${this.id}"
      >
        <h1 class="h1">${this.info.static.title}</h1>
        ${this.returnThumbs(imageSources)}
      </article>
    `;
    this.renderInsideTarget(template, this.target);
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
      const contentSlot = new ContentSlot({
        element: this.element,
      });
      contentSlot.init();
    });
  }
}

export default ArticleRenderer;
