import ImageLoader from '../ImageLoader';

class SlotLayoutSection {
  constructor(options = {}) {
    this.element = options.element;
    this.selector = options.selector;
    this.type = options.type;
    this.start = options.start;
    this.span = options.span;
    this.imageResource = null;
    this.slotLayoutSectionTemplate = '';

  }

  init() {
    console.log('New Layout Section: ',this.type);
    this.checkForType();
    this.returnLayout();
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
    }else {
      this.renderTextContent();
    }
  }

  renderImageContent() {
    this.imageResource = this.element.media.images[this.selector];
    console.log(this.imageResource.length);
    if (this.imageResource.length > 1) {
      console.log(Slider);
      this.initSlider(this.imageResource);
    } else {
      console.log('Single');
      const imageLoader = new ImageLoader({
        element: this.imageResource,
        article: this.element,
      });
      this.slotLayoutSectionTemplate += imageLoader.renderSrcSet(this.imageResource);
    }
  }

  initSlider(resource) {
    const imageSlider = new ContentSlider({
      element: resource,
    });
    this.slotLayoutSectionTemplate += imageSlider.init();
  }

  renderVideoContent() {
    this.videos = this.element.media.videos;
    console.log(this.videos);
  }

  renderMetaContent() {
    this.meta = this.element.info.meta;
    console.log(this.meta);
  }

  renderAudioContent() {
    this.audios = this.element.media.audios;
    console.log(this.audios);
  }


  renderQuoteContent() {
    this.quote = this.element.info.quote
    console.log(this.quote);
  }

  renderTextContent() {
    this.text = this.element.info.additionals;
    console.log(this.text);
  }

  returnLayout() {
    return this.slotLayoutSectionTemplate;
  }
}

export default SlotLayoutSection;
