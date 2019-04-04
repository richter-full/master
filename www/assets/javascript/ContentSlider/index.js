import { tns } from 'tiny-slider/src/tiny-slider';
import ImageLoader from '../ImageLoader';

class ContentSlider {
  constructor(options = {}) {
    this.element = options.element;
    this.resource = options.resource || null;
  }

  init() {
    this.createWrapper();
  }

  createWrapper() {
    const sliderWrapper = document.createElement('div');
    sliderWrapper.classList.add('content-slider__wrapper');
    sliderWrapper.innerText = 'Slider Content';
    this.resource.forEach((image) => {
      console.log('image and Element: ', image, this.element);
      let template = '<div class="slide">';
      const imageLoader = new ImageLoader({
        element: this.element,
        article: this.element,
      });
      template += imageLoader.renderSrcSet(this.element);
      template += '</div>';
      sliderWrapper.innerHTML += template;
    });

    this.initSlider(sliderWrapper);
  }

  initSlider(sliderWrapper) {
    console.log(sliderWrapper);
    const contentSlider = new tns({
      container: '.content-slider__wrapper',
      items: 3,
      slideBy: 'page',
      autoplay: true,
    });

    return contentSlider;
  }

}

export default ContentSlider;
