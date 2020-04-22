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
    <div class="card">
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
    menu.innerHTML = '<li class="menu__item">Категории</li>';
    let menuItem;
    this.categories.forEach((category)=>{
      menuItem = `<li class="menu__item">${category}</li>`;
      menu.innerHTML += menuItem;
    });
    console.log('Hello');
    menuParent.appendChild(menu);
  }

  _addCategoriesClickHandler() {
    const categories = document.querySelector('.categories');
    //const selectedCategory;
    categories.addEventListener('click', (e)=>{
      //selectedCategory = e.target.closest('.card').querySelector('.card-title').textContent;
    });
  }

  // _initializeCategoriesCards(selectedCategory) {
  //   const categoryIndex;
  // }

}