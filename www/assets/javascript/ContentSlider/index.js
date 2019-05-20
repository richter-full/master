import Glide from '@glidejs/glide';

class ContentSlider {
  constructor(options = {}) {
    this.element = options.element;
    this.resource = options.resource || null;
    this.slidesContent = this.element.querySelectorAll('figure') || null;
  }

  init() {
    this.createDomContent();
  }

  createDomContent() {
    console.log('SlidesContent: ', this.slidesContent, this.slidesContent.length);
    if (this.slidesContent !== null && this.slidesContent.length > 1) {
      const wrapper = document.createElement('div');
      wrapper.classList.add('glide');
      const track = document.createElement('div');
      track.classList.add('glide__track');
      track.dataset.glideEl = 'track';

      const slides = document.createElement('ul');
      slides.classList.add('glide__slides');

      let bullets = `
        <div class="glide__bullets" data-glide-el="controls[nav]">
      `;

      this.slidesContent.forEach((picture, index) => {
        const li = document.createElement('li');
        li.classList.add('glide__slide');
        li.dataset.index = index;
        picture.parentNode.insertBefore(li, picture);
        li.appendChild(picture);
        slides.appendChild(li);
        bullets += `<button class="glide__bullet" data-glide-dir="=${index}" title="Slide to Slide ${index}" ></button>`;
      });

      bullets += `
        </div>;
      `

      const arrows = `
        <div class="glide__arrows" data-glide-el="controls">
          <button class="glide__arrow glide__arrow--left" data-glide-dir="<" title="Previous Slide"><i class="la la-lg la-angle-left"></i></button>
          <button class="glide__arrow glide__arrow--right" data-glide-dir=">" title="Next Slide"><i class="la la-lg la-angle-right"></i></button>
        </div>
      `;



      track.appendChild(slides);
      wrapper.appendChild(track);
      wrapper.insertAdjacentHTML('beforeend', arrows);
      if (this.slidesContent.length > 2) {
        wrapper.insertAdjacentHTML('beforeend', bullets);
      }
      this.element.appendChild(wrapper);
      this.initSlider();
    }
  }

  initSlider() {
    new Glide(this.element, {
      type: 'slider',
      autoplay: '7000',
      rewind: false,
      perView: 1.3,
      // focusAt: 1,
      gap: 40,
    }).mount();
  }

}

export default ContentSlider;
