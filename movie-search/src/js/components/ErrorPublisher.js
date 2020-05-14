export default class ErrorPublisher {
  constructor() {
    this.parent = document.querySelector('.information');
  }

  publishError(error) {
    const errorMessage = document.createElement('span');
    errorMessage.classList.add('error');
    errorMessage.textContent = error;
    this.parent.appendChild(errorMessage);
  }
}
