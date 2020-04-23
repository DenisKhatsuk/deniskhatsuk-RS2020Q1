export default class Hamburger {
  constructor(className) {
    this.className = className;
  }

  init() {
    const hamburger = document.querySelector(`.${this.className}`);
    const icon = hamburger.querySelector('.animated-icon');
    hamburger.addEventListener('click', () => {
      icon.classList.toggle('open');
    });
  }
}
