export default class PlayPanel {
  constructor(parentClass) {
    this.parent = document.querySelector(parentClass);
  }

  init() {
    const playPanel = this.createPlayPanel('Выберите категорию', 'Начать игру');
    let playPanelEl = document.createElement('div');
    playPanelEl.classList.add('play-panel', 'categories-mode');
    playPanelEl.innerHTML = playPanel;
    this.parent.prepend(playPanelEl);
    this.buttonClickHandler();
  }

  createPlayPanel(message, button) {
    const playPanel = `
      <div class="play-panel__control">
        <h4 class="play-panel__message">${message}</h4>
        <button class="play-panel__btn btn aqua-gradient btn-rounded waves-effect waves-light">
        <i class="play-panel__btn-icon fas fa-redo-alt"></i>
        <span class="play-panel__btn-text">
          ${button}
        </span>
        </button>
      </div>
      <div class="play-panel__count"></div>
    `;
    return playPanel;
  }

  buttonClickHandler() {
    const button = document.querySelector('.play-panel__btn');
    button.addEventListener('click', ()=>{
      if (!button.classList.contains('play-panel__btn_clicked')) {
        button.classList.add('play-panel__btn_clicked');
        this.startGame();
      }
    });
  }

  startGame() {
    const cardsHolder = document.querySelector('.cards');
    const cardsElements = document.querySelectorAll('.card.card__category');
    const button = document.querySelector('.play-panel__btn');
    let cards = [];
    let currentCard = '';
    let errors = 0;

    cardsElements.forEach((el)=>{
      cards.push(el.querySelector('.card-title').textContent);
    });
    [currentCard, cards] = this.voiceCards(cards); 
    
    button.addEventListener('click', (e)=>{
      const audioElement = new Audio(`src/audio/${currentCard}.mp3`);
      audioElement.play();
    });
    
    cardsHolder.addEventListener('click', (e)=>{
      let clickedCard = e.target.closest('.card.card__category');
      if (clickedCard && !clickedCard.classList.contains('card_disabled')) {
        let clickedCardText = clickedCard.querySelector('.card-title').textContent;
        if (clickedCardText === currentCard) {
          const audioElement = new Audio(`src/audio/correct.mp3`);
          audioElement.play();
          clickedCard.classList.add('card_disabled');
          if (cards.length) {
            setTimeout(()=>{[currentCard, cards] = this.voiceCards(cards);}, 1500);
          } else {
            const finalText = errors ? `Количество ошибок: ${errors}` : 'Победа!'; 
            const finalImg = errors ? 'fail' : 'success';
            const finalAudio = errors ? 'failure' : 'success';
            document.querySelector('.main > .container').innerHTML = `
            <div class="final">
              <p class="final__text">${finalText}</p>
              <img class="final__img" src="src/img/final/${finalImg}.png" alt="Bunny image">
            </div>
            `;
            const audioElement = new Audio(`src/audio/${finalAudio}.mp3`);
            audioElement.play();
            setTimeout(()=>{document.querySelector('.header__logo > a').click();}, 3500);
          }
        } else {
          const audioElement = new Audio(`src/audio/error.mp3`);
          audioElement.play();
          errors += 1;
        }
      }
    });
  }

  voiceCards(cards) {
    let currentCard = cards[Math.ceil(Math.random()*cards.length - 1)];
    const currentCardIndex = cards.indexOf(currentCard);
    if (currentCardIndex > -1) {
      cards.splice(currentCardIndex, 1);
    }
    const audioElement = new Audio(`src/audio/${currentCard}.mp3`);
    audioElement.play();
    return [currentCard, cards];
  }

}
