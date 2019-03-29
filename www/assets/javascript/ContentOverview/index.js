import arrayFrom from 'array-from';

import ArticleRenderer from '../ArticleRenderer';
import ContentSlot from '../ContentSlot';

class ContentOverview {
  constructor(options = {}) {
    this.element = options.element;
    this.json = {};
  }

  init() {
    console.log('Content Overview Init');
    this.fetchContentFromApi();
  }

  fetchContentFromApi() {
    fetch('api')
    .then(res => res.json())
    .then((data) => {
      arrayFrom(data.articles).forEach((article) => {
        const articleRenderer = new ArticleRenderer({
          element: article,
          target: this.element,
        });
        articleRenderer.init();
      });
    });
  }
}

export default ContentOverview;
