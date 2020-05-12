export default class Search {
  static createSearchMarkup() {
    const searchMarkup = `
    <div class="search">
      <i class="search__icon_search fas fa-search"></i>
      <input class="search__input" type="search" name="search" id="search" placeholder="Search a movie">
      <button class="search__button" type="button" id="search__button">Search</button>
    </div>
    `;
    return searchMarkup;
  }
}
