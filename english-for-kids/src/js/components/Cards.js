import cardsData from '../data/cards_data';

const categories = cardsData[0];

export default class Cards {
  constructor(outputClass) {
    this.categories = categories;
    this.output = document.querySelector(`.${outputClass}`);
  }

  init() {
    this.initializeCategories();
    this.displayCategoriesInMenu('aside-panel');
  }

  static createCategory(category, categoryIndex) {
    const card = `
    <div class="card" data-category='${categoryIndex}'>
      <div class="overlay">
        <img class="card-img-top" src="./src/img/${cardsData[categoryIndex][1].image}" alt="Card image cap">
      </div>
      
      <div class="card-body">
        <h4 class="card-title">${category}</h4>
      </div>
    </div>`;
    return card;
  }

  initializeCategories() {
    let cards = '';
    let categoryIndex = 1;
    const oldOutput = this.output;
    const newOutput = oldOutput.cloneNode(true);
    this.categories.forEach((category) => {
      const card = Cards.createCategory(category, categoryIndex);
      categoryIndex += 1;
      cards += card;
    });
    oldOutput.parentNode.replaceChild(newOutput, oldOutput);
    this.output = newOutput;
    this.output.innerHTML = cards;
    this.output.classList.add('categories');
    this.addCategoriesClickHandler();
  }

  displayCategoriesInMenu(menuParentClass) {
    const menuParent = document.querySelector(`.${menuParentClass}`);
    const menu = document.createElement('ul');
    menu.classList.add('menu');
    menu.innerHTML = '<li class="menu__item"><a class="menu__link menu__link_current" href="/">Категории</a></li>';
    let menuItem;
    let categoryIndex = 1;
    this.categories.forEach((category) => {
      menuItem = `<li class="menu__item"><a class="menu__link" href="_#" data-category="${categoryIndex}">${category}</a></li>`;
      menu.innerHTML += menuItem;
      categoryIndex += 1;
    });
    menuParent.appendChild(menu);
    menuParent.addEventListener('click', (e) => {
      if (!e.target.classList.contains('menu__link')) return;
      menuParent.querySelector('.menu__link_current').classList.remove('menu__link_current');
      e.target.classList.add('menu__link_current');
      categoryIndex = e.target.getAttribute('data-category');
      if (categoryIndex) {
        const asidePanel = document.querySelector('.aside-panel');
        const asideHeader = document.querySelector('.header__aside');
        const asideButton = document.querySelector('.animated-icon');
        e.preventDefault();
        this.initializeCategoriesCards(categoryIndex);
        asidePanel.classList.remove('aside-panel_open');
        asideHeader.classList.remove('header__aside_open');
        asideButton.classList.remove('open');
      }
    });
  }

  addCategoriesClickHandler() {
    const currentCategories = document.getElementsByClassName('categories')[0];
    let selectedCategoryIndex = '';
    currentCategories.addEventListener('click', (e) => {
      if (e.target.classList.contains('cards') || !currentCategories.classList.contains('categories')) return;
      selectedCategoryIndex = e.target.closest('.card').getAttribute('data-category');
      document.querySelector('.menu__link_current').classList.remove('menu__link_current');
      document.querySelector(`[data-category="${selectedCategoryIndex}"]`).classList.add('menu__link_current');
      this.initializeCategoriesCards(selectedCategoryIndex);
    });
  }

  static addCategoriesCardsClickHandler() {
    const categoryCards = document.querySelector('.cards[class*="category"]');
    categoryCards.addEventListener('click', (e) => {
      const currentCard = e.target.closest('.card');
      const isPlayMode = document.querySelector('body').classList.contains('play');
      if (e.target.classList.contains('fas')) {
        currentCard.classList.add('card__translated');
        currentCard.addEventListener('mouseleave', () => {
          currentCard.classList.remove('card__translated');
        });
      } else if (currentCard && !isPlayMode) {
        const audioName = currentCard.querySelector('.card-title').textContent;
        const audioElement = new Audio(`src/audio/${audioName}.mp3`);
        audioElement.play();
      }
    });
  }

  static createCategoryCard(el) {
    const card = `
    <div class="card card__category">
        <div class="card__face card__face_front">
          <div class="overlay">
            <img class="card-img-top" src="./src/img/${el.image}" alt="Card image cap">
          </div>
          
          <div class="card-body">
            <a class="btn-floating card-btn btn-action ml-auto mr-4">
              <i class="fas fa-book-open"></i>
            </a>
            <h4 class="card-title">${el.word}</h4>
          </div>
        </div>

        <div class="card__face card__face_back">
          <div class="overlay">
            <img class="card-img-top" src="./src/img/${el.image}" alt="Card image cap">
          </div>
          
          <div class="card-body">
            <h4 class="card-title">${el.translation}</h4>
          </div>
        </div>
    </div>`;
    return card;
  }

  initializeCategoriesCards(selectedCategoryIndex) {
    let cards = '';
    const playPanel = document.querySelector('.play-panel');
    const oldOutput = this.output;
    const newOutput = oldOutput.cloneNode(true);
    cardsData[selectedCategoryIndex].forEach((el) => {
      const card = Cards.createCategoryCard(el);
      cards += card;
    });
    oldOutput.parentNode.replaceChild(newOutput, oldOutput);
    this.output = newOutput;
    this.output.innerHTML = cards;
    this.output.classList.remove('categories');
    this.output.classList.add(`category-${selectedCategoryIndex}`);
    if (playPanel) {
      playPanel.classList.remove('categories-mode');
      playPanel.classList.add('category-mode');
    }
    Cards.addCategoriesCardsClickHandler();
  }
}
