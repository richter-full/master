import arrayFrom from 'array-from';
import ImageLoader from '../ImageLoader';
import VideoLoader from '../VideoLoader';
import AudioLoader from '../AudioLoader';
import ContentSlider from '../ContentSlider';

class SlotLayoutSection {
  constructor(options = {}) {
    this.element = options.element;
    this.article = options.article;
    this.selector = options.selector;
    this.type = options.type;
    this.start = options.start || null;
    this.span = options.span || null;
    this.imageResource = null;
    this.slotLayoutSectionTemplate = '';
    this.slotLayoutSection = '';
  }

  init() {
    this.checkForType();

    return this.slotLayoutSection;
  }

  checkForType() {
    if (this.type == 'image') {
      this.renderImageContent();
    } else if (this.type == 'video') {
      this.renderVideoContent();
    } else if (this.type == 'meta') {
      this.renderMetaContent();
    } else if (this.type == 'audio') {
      this.renderAudioContent();
    } else if (this.type == 'quote') {
      this.renderQuoteContent();
    } else {
      this.renderTextContent();
    }
  }

  renderImageContent() {
    this.imageResource = this.element.media.images[this.selector];

    this.imageResource.forEach((image) => {
      const imageLoader = new ImageLoader({
        element: image,
        article: this.element,
      });
      this.slotLayoutSectionTemplate += imageLoader.renderSrcSet(image);
    });

    this.returnLayout();
  }

  initSlider(resource) {
    const imageSlider = new ContentSlider({
      element: this.element,
      resource: resource,
    });
    this.slotLayoutSectionTemplate += imageSlider.init();

  }

  renderVideoContent() {
    this.videos = this.element.media.videos;
    if (this.videos[this.selector]) {
      this.videos[this.selector].forEach((videoSource) => {
        let template = '';

        const videoLoader = new VideoLoader ({
          element: videoSource,
          article: this.article,
          key: this.selector,
          // source: source
        });

        template += videoLoader.init();
        this.slotLayoutSectionTemplate += template;
      });
      this.returnLayout();
    }


  }

  renderMetaContent() {
    this.meta = this.element.info.meta;

    let tagListTemplate = '<ul class="content-slot__tags">';
    arrayFrom(this.meta.tags.split(',')).forEach((tag) => {
      tagListTemplate += `<li class="content-slot__tag-pill" data-value="${tag}">${tag}</li>`;
    });
    tagListTemplate += '</ul>';

    this.slotLayoutSectionTemplate += tagListTemplate;
    this.returnLayout();
  }

  renderAudioContent() {
    this.audios = this.element.media.audios;

    Object.entries(this.audios).forEach((audio) => {
      const [key, source] = audio;
      const audioLoader = new AudioLoader ({
        element: audio,
        article: this.article,
        key: key,
        source: source,
      });

      this.slotLayoutSectionTemplate += audioLoader.init();
    });

    this.returnLayout();
  }


  renderQuoteContent() {
    this.quote = this.element.info.quote;
    const quoteTemplate = `
      <div class="text">
        <blockquote class="quote">${this.quote.text}</blockquote>
        <cite class="cite">${this.quote.author}</cite>
      </div>
    `;

    this.slotLayoutSectionTemplate += quoteTemplate;
    this.returnLayout();
  }

  renderTextContent() {
    this.text = this.element.info.additionals;

    const textTemplate = `
      <div class="text">
        <h2 class="h2 subtitle">${this.text.subtitle}</h2>
        ${this.text.description}
      </div>
    `;

    this.slotLayoutSectionTemplate += textTemplate;
    this.returnLayout();
  }

  returnLayout() {
    this.slotLayoutSection = `<section class="content-slot__section__${this.selector} grid-start--${this.start} grid-column-span--${this.span}">${this.selector}`;

    this.slotLayoutSection += this.slotLayoutSectionTemplate;
    this.slotLayoutSection += '</section>';

    return this.slotLayoutSection;
  }
}

export default SlotLayoutSection;
