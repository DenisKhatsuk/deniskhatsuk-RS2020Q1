export default class ContentBuilder {
  constructor(parentClass, ...blocks) {
    this.target = document.querySelector(`.${parentClass}`);
    this.fragment = document.createDocumentFragment();
    blocks.forEach((el) => {
      this.fragment.appendChild(el);
    });
  }

  addContentToDOM() {
    this.target.prepend(this.fragment);
  }
}
