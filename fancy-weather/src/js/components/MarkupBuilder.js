function buildHeader() {
  const header = document.createElement('header');
  header.classList.add('header');
  header.innerHTML = `
    <div class="container header__container">
    </div>
  `;
  document.body.append(header);
}

function buildMain() {
  const main = document.createElement('main');
  main.classList.add('main');
  main.innerHTML = `
    <div class="main__container container">
      <div class="main__weather"></div>
      <div class="main__map"></div>
    </div>
  `;
  document.body.append(main);
}

export default {
  buildHeader,
  buildMain,
};
