import Search from './Search';

export default class Main {
  static createMain() {
    const main = Main.createMainElement();
    const mainEl = document.createElement('main');
    mainEl.classList.add('main');
    mainEl.innerHTML = main;
    return mainEl;
  }

  static createMainElement() {
    const search = Search.markup;
    const main = `
    <div class="container main__container">
      <section class="search-wrapper">
        ${search}
      </section>
      <section class="information">
      </section>
      <section class="carousel">

      </section>
    </div>
    `;
    return main;
  }

  static setMinHeight() {
    const headerHeight = document.querySelector('header').offsetHeight;
    const footerHeight = document.querySelector('footer').offsetHeight;
    const windowHeight = window.innerHeight;
    const mainMinHeight = windowHeight - (headerHeight + footerHeight);
    document.querySelector('main').setAttribute('style', `min-height: ${mainMinHeight}px`);
  }

  static addMinHeight() {
    Main.setMinHeight();
    window.addEventListener('resize', () => {
      Main.setMinHeight();
    });
  }
}
