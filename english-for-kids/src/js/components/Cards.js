import cardsData from '../data/cards_data';

export default class Cards {
  constructor(outputClass) {
    this.categories = cardsData[0];
    this.output = document.querySelector(`.${outputClass}`);
  }
  init() {
    this._initializeCategories();
    this._displayCategoriesInMenu('aside-panel');
  }

  _createCategory(category, categoryIndex) {
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

  _initializeCategories() {
    let cards = '';
    let categoryIndex = 1;
    this.categories.forEach((category)=>{
      const card = this._createCategory(category, categoryIndex);
      categoryIndex++;
      cards += card;
    });
    this.output.innerHTML = cards;
    this.output.classList.add('categories');
    this._addCategoriesClickHandler();
  }

  _displayCategoriesInMenu(menuParentClass) {
    const menuParent = document.querySelector(`.${menuParentClass}`);
    let menu = document.createElement('ul');
    menu.classList.add('menu');
    menu.innerHTML = '<li class="menu__item"><a class="menu__link menu__link_current" href="/">Категории</a></li>';
    let menuItem;
    let categoryIndex = 1;
    this.categories.forEach((category)=>{
      menuItem = `<li class="menu__item"><a class="menu__link" href="_#" data-category="${categoryIndex}">${category}</a></li>`;
      menu.innerHTML += menuItem;
    });
    menuParent.appendChild(menu);
    menuParent.addEventListener('click', (e)=>{
      if (!e.target.classList.contains('menu__link')) return;
      let categoryIndex = e.target.getAttribute('data-category');
      e.preventDefault();
      this._initializeCategoriesCards(categoryIndex);
    });
  }

  _addCategoriesClickHandler() {
    let categories = document.getElementsByClassName('categories')[0];
    let selectedCategoryIndex = '';
    categories.addEventListener('click', (e)=>{
      if (e.target.classList.contains('cards') || !categories.classList.contains('categories')) return;
      selectedCategoryIndex = e.target.closest('.card').getAttribute('data-category');
      this._initializeCategoriesCards(selectedCategoryIndex);
    });
  }

  _addCategoriesCardsClickHandler() {
    const categoryCards = document.querySelector('[class*="category"]');
    categoryCards.addEventListener('click', (e)=>{
      const currentCard = e.target.closest('.card');
      if (e.target.classList.contains('fas')) {
        
        currentCard.classList.add('card__translated');
        currentCard.addEventListener('mouseleave', ()=>{
          currentCard.classList.remove('card__translated');
        });
      } else {
        const audioName = currentCard.querySelector('.card-title').textContent;
        const audioElement = new Audio(`src/audio/${audioName}.mp3`);
        audioElement.play();
      }
    });
  }

  _createCategoryCard(el) {
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

  _initializeCategoriesCards(selectedCategoryIndex) {
    let cards = '';
    cardsData[selectedCategoryIndex].forEach((el)=>{
      const card = this._createCategoryCard(el);
      cards += card;
    });  
    this.output.innerHTML = cards;
    this.output.classList.remove('categories');
    this.output.classList.add(`category-${selectedCategoryIndex}`);
    this._addCategoriesCardsClickHandler();
  }

}