import arrayFrom from 'array-from';
import ImageLoader from '../ImageLoader';
import SlotLayoutSection from '../SlotLayoutSection';

const insertPosition = () => {
  return 1;
};

class ContentSlot {
  constructor(options = {}) {
    this.element = options.element;
    this.insertPosition = insertPosition();
    this.oldSlot = document.querySelector('.content-slot__wrapper') || null;
    this.structure = this.element['structure'] || null;
  }

  init() {
    console.log('New Content Slot with: ', this.element);
    if(this.oldSlot !== null) {
      this.removeOldSlot();
    }
    this.generateSlot();
    this.generateSlotLayout();
  }

  removeOldSlot() {
    const oldSlot = document.querySelector('.content-slot__wrapper');
    oldSlot.parentNode.removeChild(oldSlot);
  }

  generateSlot() {
    const slotWrapper = document.createElement('article');

    slotWrapper.classList.add('content-slot__wrapper');
    slotWrapper.style.padding = '100px';
    slotWrapper.style.background = 'cyan';
    const overviewItems = document.querySelectorAll('article.content-overview__item');

    document.querySelector('.content-overview').insertBefore(slotWrapper, overviewItems[this.insertPosition]);

    this.insertContent(slotWrapper);
    slotWrapper.addEventListener('click', () => {
      slotWrapper.parentNode.removeChild(slotWrapper);
    });
  }

  generateSlotLayout() {
    console.log(this.structure, this.element);
    if (this.structure || null) {
      this.structure.forEach((structureEntry) => {
        console.log(structureEntry.type);
        const slotLayout = new SlotLayoutSection ({
          element: this.element,
          selector: structureEntry.selector,
          type: structureEntry.type,
          start: structureEntry.start,
          span: structureEntry.span,
        })
        slotLayout.init();
      });
    } else {
      console.log('No Structure to Render...');
    }
  }

  insertContent(slotWrapper) {
    const slotContent = document.createElement('section');
    slotContent.classList.add('content-slot__content');

    // All Informations:
    this.info = this.element.info;
    const articleInfo = document.createElement('section');
    articleInfo.classList.add('content-slot__content__info');
    const articleInfoTemplate = `
      <div class="info__title">
        <h1>${this.info.static.title}</h1>
      </div>
      <div class="info__meta">
        ${this.returnTags()}
      </div>
    `;
    articleInfo.innerHTML += articleInfoTemplate;

    const articleMainImages = document.createElement('section');
    articleMainImages.classList.add('content-slot__content__main-images');
    if (this.element.media.images.mainImages) {
      articleMainImages.innerHTML += this.insertImages(this.element.media.images.mainImages);
    };

    slotContent.appendChild(articleInfo);
    slotContent.appendChild(articleMainImages);

    slotWrapper.appendChild(slotContent);
  }

  returnTags() {
    const tags = this.element.info.meta.tags.split(',');
    let tagsTemplate = '<ul>';
    tags.forEach((tag) => {
      const tagTemplate = `<li class="info__tag-pill">${tag}</li>`
      tagsTemplate += tagTemplate;
    });
    tagsTemplate += '</ul>';

    return tagsTemplate;
  }

  insertImages(resources) {
    let resourceTemplate = '';
    resources.forEach((resource) => {
      // console.log('Resource', resource);
      const imageLoader = new ImageLoader({
        element: resource,
        article: this.element,
      })
      resourceTemplate += imageLoader.renderSrcSet(resource);

    });

    return resourceTemplate;
  }
}

export default ContentSlot;
