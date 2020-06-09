class Search {
  constructor() {
    this.placeholder = 'Search a movie';
    this.markup = `
      <form class="search" autocomplete="off">
        <i class="search__icon_search fas fa-search"></i>
        <i class="search__icon_spinner fas fa-spinner fa-spin"></i>
        <input class="search__input" type="text" name="search" id="search" placeholder="${this.placeholder}" autofocus>
        <i class="search__icon_close fas fa-times"></i>
        <button class="search__button" type="submit" id="search__button">Search</button>
      </form>
    `;
  }

  startSearchIconsHandler() {
    const searchForm = document.querySelector('form.search');
    const searchInput = searchForm.querySelector('input');
    const searchClearButton = document.querySelector('.search__icon_close');
    searchInput.addEventListener('input', () => {
      if (searchInput.value !== '') {
        searchClearButton.classList.add('search__icon_visible');
      } else {
        searchClearButton.classList.remove('search__icon_visible');
      }
    });
    searchClearButton.addEventListener('click', () => {
      searchInput.value = '';
      searchInput.placeholder = this.placeholder;
      searchClearButton.classList.remove('search__icon_visible');
      searchInput.focus();
    });
  }
}

export default new Search();
