class SearchHandler {
  static createSearchMarkup() {
    const searchMarkup = `
    <form class="search" autocomplete="off">
      <input class="search__input" type="text" name="search" id="search" placeholder="Search city">
      <button class="search__button" type="submit" id="search__button">Search</button>
    </form>
    `;
    return searchMarkup;
  }

  publishSearchField(parentElement = 'body') {
    const parent = document.querySelector(`${parentElement}`);
    const searchMarkup = SearchHandler.createSearchMarkup();
    const searchElement = document.createElement('div');
    searchElement.classList.add('main__search');
    searchElement.innerHTML = searchMarkup;
    parent.append(searchElement);
    return this;
  }
}

export default new SearchHandler();
