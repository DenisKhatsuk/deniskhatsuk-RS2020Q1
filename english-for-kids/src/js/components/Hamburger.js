export default class Hamburger {
  constructor(className) {
    this.className = className;
  }
  init() {
    const hamburger = document.querySelector(`.${this.className}`);
    const icon = hamburger.querySelector('.animated-icon');
    hamburger.addEventListener('click',(e)=>{
      icon.classList.toggle('open');
    });  
  }
}
