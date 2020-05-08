export default class Footer {

  init() {
    const footer = Footer.createFooterElement();
    const footerEl = document.createElement('footer');
    footerEl.classList.add('footer');
    footerEl.innerHTML = footer;
    document.querySelector('body').appendChild(footerEl);
  }

  static createFooterElement() {
    const footer = `
    <div class="container footer__container">
      <div class="footer__info">
        <span>RS School 2020 Q1</span>
      </div>
      <div class="footer__info">
        <a class="footer__info-link" href="https://github.com/DenisKhatsuk" target="_blank">
      </div>
    </div>
    `;
    return footer;
  }
}
