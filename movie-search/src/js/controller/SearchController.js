class SearchController {
  constructor() {
    this.movieListeners = [];
  }

  addListener(listener) {
    this.movieListeners.push(listener);
  }

  async startEventListeners() {
    this.movieListeners.forEach((listener) => {
      listener();
    });
  }
}

export default new SearchController();
