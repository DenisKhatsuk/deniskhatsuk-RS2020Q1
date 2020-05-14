export default class Search {
  static createSearchMarkup() {
    const searchMarkup = `
    <form class="search" autocomplete="off">
      <i class="search__icon_search fas fa-search"></i>
      <i class="search__icon_spinner fas fa-spinner fa-spin"></i>
      <input class="search__input" type="text" name="search" id="search" placeholder="Search a movie">
      <i class="search__icon_close fas fa-times"></i>
      <button class="search__button" type="submit" id="search__button">Search</button>
    </form>
    `;
    return searchMarkup;
  }
}
