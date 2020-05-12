class SearchDataHandler {
  static async getMovies(searchInput) {
    const apiKey = 'fa7b0bcf';
    const request = searchInput.value.toString();
    const url = `//omdbapi.com/?s=${request}&apikey=${apiKey}`;
    const response = await fetch(url);
    const moviesFullData = await response.json();
    const moviesList = SearchDataHandler.parseMovies(moviesFullData);
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
