// import SearchDataHandler from '../data/SearchDataHandler';

class SearchController {
  constructor() {
    this.movieListeners = [];
  }

  addListener(listener) {
    this.movieListeners.push(listener);
  }

  async start() {
    this.movieListeners.forEach((listener) => {
      listener();
    });
  }
}

export default new SearchController();
