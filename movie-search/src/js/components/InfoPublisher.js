export default class InfoPublisher {
  constructor() {
    this.parent = document.querySelector('.information');
  }

  publishInfo(info) {
    const infoMessage = document.createElement('span');
    infoMessage.classList.add('info');
    infoMessage.textContent = `${info}. `;
    this.parent.prepend(infoMessage);
  }
}
