export default class Header {

  init() {
    const header = Header.createHeaderElement();
    const headerEl = document.createElement('header');
    headerEl.classList.add('header');
    headerEl.innerHTML = header;
    document.querySelector('body').prepend(headerEl);
  }

  static createHeaderElement() {
    const header = `
    <div class="container header__container">
      <div class="logo header__logo">
        <img class="logo__img" src="./src/img/logo.png" alt="Logo">
      </div>
      <div class="search header__search"></div>
    </div>
    `;
    return header;
  }
}