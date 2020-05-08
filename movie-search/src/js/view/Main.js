export default class Main {
  init() {
    const main = Main.createMainElement();
    const mainEl = document.createElement('main');
    mainEl.classList.add('main');
    mainEl.innerHTML = main;
    return mainEl;
  }

  static createMainElement() {
    const main = `
    <div class="container main__container">
      <section class="search">
        <input class="search" type="text" name="search" id="search">
      </section>
      <section class="carousel">

      </section>
    </div>
    `;
    return main;
  }

  setMinHeight() {
    const headerHeight = document.querySelector('header').offsetHeight;
    const footerHeight = document.querySelector('footer').offsetHeight;
    const windowHeight = window.innerHeight;
    const mainMinHeight = windowHeight - (headerHeight + footerHeight);
    document.querySelector('main').setAttribute('style', `min-height: ${mainMinHeight}px`);
  }

  addMinHeight() {
    this.setMinHeight();
    window.addEventListener('resize', ()=>{
      this.setMinHeight();
    });
  }
}
