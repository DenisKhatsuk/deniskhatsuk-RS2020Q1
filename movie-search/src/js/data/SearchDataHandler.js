class SearchDataHandler {
  static async getMovies(searchInput) {
    const searchDataHandler = new SearchDataHandler();
    const apiKey = 'fa7b0bcf';
    const request = searchInput.value.toString();
    const url = `http://www.omdbapi.com/?s=${request}&apikey=${apiKey}`;
    const response = await fetch(url);
    const moviesFullData = await response.json();
    const moviesList = searchDataHandler.parseMovies(moviesFullData);
    return moviesList;
  }

  static async parseMovies(response) {
    return response.Search.map(({ Title, Year, Poster }) => ({
      title: Title,
      year: Year,
      poster: Poster,
    }));
  }
}

export default new SearchDataHandler();
