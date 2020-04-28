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
  }

  createPlayPanel(message, button) {
    const playPanel = `
      <div class="play-panel__control">
        <h4 class="play-panel__message">${message}</h4>
        <button class="play-panel__btn btn aqua-gradient btn-rounded waves-effect waves-light">${button}</button>
      </div>
      <div class="play-panel__count"></div>
    `;
    return playPanel;
  }
}
