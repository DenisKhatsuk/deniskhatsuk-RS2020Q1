class InputHandler {
  constructor() {
    this.apiKey = 'fa7b0bcf';
  }

  async getMoviesList(searchRequest) {
    const url = `//omdbapi.com/?s=${searchRequest}&apikey=${this.apiKey}`;
    const response = await fetch(url);
    const moviesFullData = await response.json();
    const moviesList = InputHandler.parseMovies(moviesFullData);
    return moviesList;
  }

  static parseMovies(response) {
    return response.Search.map(({
      Title, Year, Poster, imdbID,
    }) => ({
      title: Title,
      year: Year,
      poster: Poster,
      imdbID,
    }));
  }
}

export default new InputHandler();
