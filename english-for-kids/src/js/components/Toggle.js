export default class Toggle {
  constructor(toggleClass) {
    this.toggle = document.querySelector(`.${toggleClass}`);
    this.state = 'train';
  }

  init() {
    const body = document.querySelector('body');
    this.toggle.querySelector('label').addEventListener('click', ()=>{
      body.classList.toggle('play');
      this.state = this.state === 'train' ? 'play' : 'train';
      if (this.state === 'train') document.querySelector('.play-panel__btn').classList.remove('play-panel__btn_clicked');
    });
  }
}
