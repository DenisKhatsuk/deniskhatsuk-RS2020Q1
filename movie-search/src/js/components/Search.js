export default class Search {
  static createSearchMarkup() {
    const searchMarkup = `
    <form class="search" autocomplete="off">
      <i class="search__icon_search fas fa-search"></i>
      <input class="search__input" type="text" name="search" id="search" placeholder="Search a movie">
      <button class="search__button" type="submit" id="search__button">Search</button>
    </form>
    `;
    return searchMarkup;
  }
}
