import arrayFrom from 'array-from';

const BREAKPOINTS = window.config.breakpoints;

class ImageLoader {
  constructor(options = {}) {
    this.element = options.element;
    this.article = options.article;
    this.imgConfig = {
      testUrl: 'https://res.cloudinary.com/richterskala/image/upload/c_scale,e_blur_faces:2000,h_150,w_200/v1553697105/samples/people/boy-snow-hoodie.jpg',
      baseUrl: 'https://res.cloudinary.com/richterskala/image/upload/',
      defaults: {
        height: 1000,
        width: 1500,
        blur: 2000,
      },
      imgCommands: {
        scale: 'c_fit,',
        blur_faces: 'e_blur_faces',
        blur: 'e_blur',
        height: 'h_',
        width: 'w_',
      },
      imgWidths: {
        small: 400,
        medium: 750,
        large: 2000,
      }
    }
  }

  init() {
    console.log('New Image Loader with: ', this.element);
  }

  renderThumbTemplate(src) {
    const template = `
      <figure class="content-overview__item__thumb">
        <img src="${this.returnImgPath(this.article.info.static.title+'/'+this.article.info.static.hash+'-'+src.hash, 400, 400, src.extension, 40000)}" />
      </figure>
    `
    return template;
  }

  renderSrcSet(src) {
    const name = `${this.article.info.static.title+'/'+this.article.info.static.hash+'-'+src.hash}`;
    let srcSetTemplate = `<picture class="content-overview__item__srcset">`
    Object.values(BREAKPOINTS).forEach((breakpoint) => {
      srcSetTemplate += `
        <source
          media="(max-width: ${breakpoint}px)"
          srcset="
            ${this.returnImgPath(name, breakpoint, breakpoint, src.extension, 0)} 1x,
            ${this.returnImgPath(name, breakpoint * 2, breakpoint * 2, src.extension, 0)} 2x
          "
        />
      `;
    })
    srcSetTemplate += `
      <img src="${this.returnImgPath(name, 1000, 1000, src.extension, 0)}" />
    `;
    srcSetTemplate +=  '</picture>';
    // console.log('SRCSET TEMPLATE: ', srcSetTemplate);
    return srcSetTemplate;
  }

  returnImgPath(name, height = this.imgConfig.defaults.height, width = this.imgConfig.defaults.width, extension, blur = this.imgConfig.defaults.blur) {
    const con = this.imgConfig;
    const com = con.imgCommands;
    return `${con.baseUrl}${com.scale}${com.blur}:${blur},${com.blur_faces}:${blur},${com.height}${height},${com.width}${width}/${name}.${extension}`
  }
}

export default ImageLoader;
