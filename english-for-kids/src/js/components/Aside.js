export default class Aside {
  constructor(menuButton, asideClass) {
    this.trigger = document.querySelector(`.${menuButton}`);
    this.aside = document.querySelector(`.${asideClass}`);
  }

  init() {
    this.trigger.addEventListener('click', () => {
      this.aside.classList.toggle('aside-panel_open');
      this.aside.closest('.header__aside').classList.toggle('header__aside_open');
    });
    this.outsideAsideClickHandler();
  }

  outsideAsideClickHandler() {
    document.querySelector('body').addEventListener('click', (e) => {
      const isAsideClick = e.target.closest('.header__aside_open');
      const isAsideOpen = document.querySelector('.header__aside_open');
      const isHamburgerClick = e.target.closest('.header__menu-icon');
      if (!isAsideClick && !isHamburgerClick && isAsideOpen) {
        this.aside.classList.toggle('aside-panel_open');
        this.aside.closest('.header__aside').classList.toggle('header__aside_open');
        this.trigger.querySelector('.animated-icon').classList.toggle('open');
      }
    });
  }
}
