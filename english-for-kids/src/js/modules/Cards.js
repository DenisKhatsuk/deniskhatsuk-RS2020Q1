export default class Cards {
  constructor(cardsData, outputClass) {
    this.categories = cardsData[0];
    this.output = document.querySelector(`.${outputClass}`);
  }
  init() {
    this._initializeCategories();
    this._displayCategoriesInMenu('aside-panel');
  }

  _createCategory(category) {
    const card = `
    <div class="card">
      <div class="overlay">
        <img class="card-img-top" src="https://mdbootstrap.com/img/Photos/Others/food.jpg" alt="Card image cap">
      </div>
      
      <div class="card-body">
        <h4 class="card-title">${category}</h4>
      </div>
    </div>`;
    return card;
  }

  _initializeCategories() {
    let cards = '';
    this.categories.forEach((category)=>{
      const card = this._createCategory(category);
      cards += card;
    });
    this.output.innerHTML = cards;
    this.output.classList.add('categories');
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



}