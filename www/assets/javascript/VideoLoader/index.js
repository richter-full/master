class VideoLoader {
  constructor(options = {}) {
    this.element = options.element;
    this.article = options.article;
    this.key = options.key;
    this.source = options.source;
  }

  init() {
    if(this.key.includes('File')) {
      return this.returnVideoTemplate(this.element);
    } else if (this.key.includes('Link')) {
      return this.returnVimeoEmbed(this.element.url);
    }
  }

  returnVideoTemplate(source) {
    const videoTemplate = `
      <video controls="controls" height="360" loop poster="https://res.cloudinary.com/richterskala/image/upload/${this.article.info.static.title}/${this.article.info.static.hash}-${source.poster.hash}.${source.poster.extension}" preload="none" style="margin: 0 auto;display: block" width="640">
        <source src="https://res.cloudinary.com/richterskala/raw/upload/${this.article.info.static.title}/${this.article.info.static.hash}-${source.hash}.${source.extension}" type="video/${source.extension}" />
      </video>
    `;

    return videoTemplate;
  }

  returnVimeoEmbed(link) {
    const youtubeEmbed = `
      <iframe src="${link}" width="640" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
    `;

    return youtubeEmbed;
  };


}

export default VideoLoader;
