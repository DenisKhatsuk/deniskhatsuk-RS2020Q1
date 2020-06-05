function buildHeader() {
  const header = document.createElement('header');
  header.classList.add('header');
  header.innerHTML = `
    <div class="header__control"></div>
    <div class="header__search"></div>
  `;
  document.body.append(header);
}

function buildMain() {
  const main = document.createElement('main');
  main.classList.add('main');
  main.innerHTML = `
    <div class="container">
    </div>
  `;
  document.body.append(main);
}

export default {
  buildHeader,
  buildMain,
};
