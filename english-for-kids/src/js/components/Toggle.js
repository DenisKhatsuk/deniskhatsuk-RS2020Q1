export default class Toggle {
  constructor(toggleClass) {
    this.toggle = document.querySelector(`.${toggleClass}`);
    this.state = 'train';
  }

  init() {
    this.toggle.querySelector('label').addEventListener('click', ()=>{
      document.querySelector('body').classList.toggle('play');
      this.state = this.state === 'train' ? 'play' : 'train';
    });
  }
}