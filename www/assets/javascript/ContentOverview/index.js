import 'url-search-params-polyfill';
import scrollToElement from 'scroll-to-element';
import arrayFrom from 'array-from';
import ArticleRenderer from '../ArticleRenderer';
import ContentSlot from '../ContentSlot';

const CONFIG_SCROLL = window.config.generals.scrollConfig;

class ContentOverview {
  constructor(options = {}) {
    this.element = options.element;
    this.json = {};
    this.articles = null;
    this.query = window.location.search || null;
  }

  init() {
    console.log('Content Overview Init');
    this.fetchContentFromApi();
  }

  fetchContentFromApi() {
    fetch('api')
    .then(res => res.json())
    .then((data) => {
      this.articles = data.articles;
      this.renderArticles();
    });
  }

  renderArticles() {
    let stateObj = { foo: 'bar' };

    arrayFrom(this.articles).forEach((article) => {
      const articleRenderer = new ArticleRenderer({
        element: article,
        target: this.element,
      });
      articleRenderer.init();
      this.watchUrl();
    });
  };

  watchUrl() {
    if (this.query !== null) {
      const query = new URLSearchParams(window.location.search).get('id');
      const element = arrayFrom(this.articles).findIndex((element) => {
        scrollToElement(document.getElementById(element.info.static.hash), CONFIG_SCROLL);
        const contentSlot = new ContentSlot({
          element: element,
          article: element,
        });
        contentSlot.init();
      });
    }
  }
}

export default ContentOverview;
