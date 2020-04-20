export default class Aside {
  constructor(menuButton, asideClass) {
    this.trigger = document.querySelector(`.${menuButton}`);
    this.aside = document.querySelector(`.${asideClass}`);
  }

  init() {
    this.trigger.addEventListener('click', ()=>{
      this.aside.classList.toggle('aside-panel_open');
    })
  }
}
