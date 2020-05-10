export default class SearchDataHandler {

  async getMovieInformation(response) {
    let movies = [];
    response.Search.forEach((movie)=>{
      const {Title, Year, Poster} = movie;
      movies.push({
        title: Title,
        year: Year,
        poster: Poster,
      });
    });
    return movies;
  }
}
