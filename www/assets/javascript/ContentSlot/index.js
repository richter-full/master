import scrollToElement from 'scroll-to-element';
import arrayFrom from 'array-from';
import SlotLayoutSection from '../SlotLayoutSection';
import getEventHandlerResize from '../ResizeHandler';



const BREAKPOINT_KEYS = window.config.breakpointKeys;
const CONFIG_SCROLL = window.config.generals.scrollConfig;

const insertPosition = (viewport, currentElement) => {
  const overviewItems = document.querySelectorAll('article.content-overview__item');
  const itemPosition = arrayFrom(overviewItems).findIndex((element) => {
    return element.id === currentElement.info.static.hash;
  });

  let itemsPerRow = null;
  switch (viewport) {
    case BREAKPOINT_KEYS.xlarge:
      itemsPerRow = 4;
      break;
    case BREAKPOINT_KEYS.large:
      itemsPerRow = 4;
      break;
    case BREAKPOINT_KEYS.medium:
      itemsPerRow = 3;
      break;
    case BREAKPOINT_KEYS.small:
      itemsPerRow = 2;
      break;
  }

  const modulo = () => {
    if(itemPosition !== 0) {
      return itemPosition % itemsPerRow;
    } else {
      return 1;
    }
  }

  const insertPosition = () => {
    if(itemPosition !== 0) {
      return itemPosition - modulo() + itemsPerRow;
    } else {
      return itemPosition - modulo() + itemsPerRow + 1;
    }
  };

  return insertPosition();
};

class ContentSlot {
  constructor(options = {}) {
    this.element = options.element;
    this.article = options.article;

    this.insertPosition = insertPosition(getEventHandlerResize().getCurrentViewport(), this.element);
    this.oldSlot = document.querySelector('.content-slot__wrapper') || null;
    this.structure = this.element['structure'] || null;
    this.slotWrapper = null;
    this.id = this.element.info.static.hash;
  }

  init() {
    if(this.oldSlot !== null) {
      this.removeOldSlot();
    }

    this.generateSlot();
    this.generateSlotLayout();
    this.setDominantColor();
  }

  removeOldSlot() {
    const oldSlot = document.querySelector('.content-slot__wrapper');
    oldSlot.parentNode.removeChild(oldSlot);
  }

  generateSlot() {
    const slotWrapper = document.createElement('article');

    slotWrapper.classList.add('content-slot__wrapper');
    slotWrapper.classList.add('grid-column-span--12');
    slotWrapper.classList.add('grid-row-span--6');
    // slotWrapper.style.padding = '100px';
    slotWrapper.style.background = 'grey';
    slotWrapper.style.overflow = 'auto';
    const overviewItems = document.querySelectorAll('article.content-overview__item');

    document.querySelector('.mod--content-overview').insertBefore(slotWrapper, overviewItems[this.insertPosition]);

    this.slotWrapper = slotWrapper;

    slotWrapper.addEventListener('click', () => {
      slotWrapper.parentNode.removeChild(slotWrapper);
      console.log('Closing');
      console.log(scrollToElement(document.getElementById(this.id), CONFIG_SCROLL));
      scrollToElement(document.getElementById(this.id), CONFIG_SCROLL);
    });
  }

  generateSlotLayout() {
    if (this.structure.length >= 1) {
      let slotLayoutElements = '';

      this.structure.forEach((structureEntry) => {
        const slotLayoutSection = new SlotLayoutSection ({
          element: this.element,
          article: this.article,
          selector: structureEntry.selector,
          type: structureEntry.type,
          start: structureEntry.start,
          span: structureEntry.span,
        })
        slotLayoutElements += slotLayoutSection.init();
      });
      this.insertContent(slotLayoutElements);
    } else {
      console.log('No Structure to Render...');
    }
  }

  insertContent(elements) {
    const slotContent = document.createElement('div');
    slotContent.classList.add('content-slot__content');
    slotContent.innerHTML = elements;

    this.slotWrapper.appendChild(slotContent);
  }

  setDominantColor() {

  }
}

export default ContentSlot;
