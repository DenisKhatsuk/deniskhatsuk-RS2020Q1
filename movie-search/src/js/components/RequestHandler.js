import InfoPublisher from './InfoPublisher';

class RequestHandler {
  constructor() {
    this.omdbApiKey = 'fa7b0bcf';
    this.translateApiKey = 'trnsl.1.1.20200516T113817Z.99caae562194b6be.bb74a28df0fa9adf9f1850fd78bfe2940dab3924';
  }

  async getMoviesList(searchRequest, resultsPage) {
    const page = resultsPage ? `&page=${resultsPage}` : '';
    const url = `https://omdbapi.com/?s=${searchRequest}${page}&apikey=${this.omdbApiKey}`;
    const response = await fetch(url);
    const moviesFullData = await response.json();
    if (JSON.stringify(moviesFullData.Error)) {
      const error = `Server replied with: ${JSON.stringify(moviesFullData.Error)}`;
      InfoPublisher.publishInfo(error);
    }
    const moviesList = RequestHandler.parseMovies(moviesFullData);
    const moviesRatings = await Promise.all(this.createRatingsArray(moviesList));
    return RequestHandler.addImdbRatings(moviesList, moviesRatings);
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
    const url = `//omdbapi.com/?i=${movieID}&apikey=${this.omdbApiKey}`;
    const response = await fetch(url);
    const movieInfo = await response.json();
    const rating = movieInfo.imdbRating;
    return rating;
  }

  async makeRequest(request, page) {
    const moviesList = await this.getMoviesList(request, page);
    return moviesList;
  }

  async translateRequestFromRussian(request) {
    const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${this.translateApiKey}&text=${request}&lang=ru-en`;
    const response = await fetch(url);
    const translatedRequest = await response.json();
    return translatedRequest.text[0];
  }
}

export default new RequestHandler();
