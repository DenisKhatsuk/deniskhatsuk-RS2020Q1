import SearchDataHandler from '../data/SearchDataHandler';

export default class SearchController {

  constructor(searchClass) {
    this.searchInput = document.querySelector(`.${searchClass} input`);
    this.searchButton = document.querySelector(`.${searchClass} button`);
  }

  start() {
    this.searchButton.addEventListener('click', async ()=>{
      const data = await this.getMovies(this.searchInput);
      console.log(data);
    });
  }

  async getMovies(searchInput) {
    const searchDataHandler = new SearchDataHandler();

    const apiKey = 'fa7b0bcf';
    let request = searchInput.value.toString();
    let url = `http://www.omdbapi.com/?s=${request}&apikey=${apiKey}`;
    let response = await fetch(url);
    let moviesFullData = await response.json();

    const moviesList = searchDataHandler.getMovieInformation(moviesFullData);
    return moviesList;
  }

}
