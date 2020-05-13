class RequestHandler {
  constructor() {
    this.apiKey = 'fa7b0bcf';
  }

  async getMoviesList(searchRequest) {
    const url = `//omdbapi.com/?s=${searchRequest}&apikey=${this.apiKey}`;
    // try {
    const response = await fetch(url);
    // } catch(error) {

    // }
    const moviesFullData = await response.json();
    const moviesList = RequestHandler.parseMovies(moviesFullData);
    const moviesRatings = await Promise.all(this.createRatingsArray(moviesList));
    const movies = RequestHandler.addImdbRatings(moviesList, moviesRatings);
    return movies;
  }

  createRatingsArray(moviesList) {
    const arrayOfRatings = moviesList.map((movie) => (
      this.getImdbRating(movie.imdbID)
    ));
    return arrayOfRatings;
  }

  static addImdbRatings(moviesList, moviesRatings) {
    const movies = moviesList.map((movie, index) => (
      Object.defineProperty(movie, 'imdbRating', {
        __proto__: null,
        value: moviesRatings[index],
      })
    ));
    return movies;
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

  async getImdbRating(movieID) {
    const url = `//omdbapi.com/?i=${movieID}&apikey=${this.apiKey}`;
    const response = await fetch(url);
    const movieInfo = await response.json();
    const rating = movieInfo.imdbRating;
    return rating;
  }

  async makeRequest(request) {
    const moviesList = await this.getMoviesList(request);
    return moviesList;
  }
}

export default new RequestHandler();
