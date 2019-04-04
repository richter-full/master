class AudioLoader {
  constructor(options = {}) {
    this.element = options.element;
    this.article = options.article;
    this.key = options.key;
    this.source = options.source;
  }

  init() {
    if(this.key === 'audioFile') {
      return this.returnAudioTemplate(this.source[0]);
    } else if (this.key === 'audioLink') {
      return this.returnYoutubeEmbed(this.source[0].url);
    }
  }

  returnAudioTemplate(source) {
    const audioTemplate = `
      <audio src="https://res.cloudinary.com/richterskala/raw/upload/${this.article.info.static.title}/${this.article.info.static.hash}-${source.hash}.${source.extension}" controls autoplay loop>
        <p>Your browser does not support the audio element </p>
      </audio>
    `;

    return audioTemplate;
  }

  returnYoutubeEmbed(link) {
    const youtubeEmbed = `
      <iframe width="560" height="315" src="${link}" frameborder="0"></iframe>
    `;

    return youtubeEmbed;
  };


}

export default AudioLoader;
