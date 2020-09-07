import AddLanguageSelectorHandler from './ButtonDropdown';
import SetAppBackground from './BackgroundHandler';

class ControlHandler {
  static createControlMarkup(state) {
    const imperialClass = state.units === 'metric' ? 'control__button_disabled' : '';
    const metricClass = state.units === 'metric' ? '' : 'control__button_disabled';
    const ControlMarkup = `
      <div class="control header__control">
        <button class="control__button control__button_refresh" type="button">
          <span class="control__button_icon"></span>
        </button>

        <div class="button-dropdown control__language">
          <button class="button-dropdown__button button-dropdown__button_current" type="button">
            <div class="button-dropdown__button_text" data-type="en">
              EN
            </div>
          </button>
          <div class="button-dropdown__content">
            <button class="button-dropdown__button button-dropdown__button_selected" data-type="en" type="button">EN</button>
            <button class="button-dropdown__button" data-type="ru" type="button">RU</button>
            <button class="button-dropdown__button" data-type="be" type="button">BE</button>
          </div>
        </div>

        <div class="control__group control__units">
          <button class="control__button control__button_unit ${imperialClass}" data-type="imperial" type="button">°F</button>
          <button class="control__button control__button_unit ${metricClass}" data-type="metric" type="button">°С</button>
        </div>

      </div>
    `;
    return ControlMarkup;
  }

  publishControlBlock(parentElement = 'body', state) {
    const parent = document.querySelector(`${parentElement}`);
    const controlMarkup = ControlHandler.createControlMarkup(state);
    const controlElement = document.createElement('div');
    controlElement.classList.add('header__control');
    controlElement.innerHTML = controlMarkup;
    parent.append(controlElement);
    return this;
  }

  startControlFunctions() {
    AddLanguageSelectorHandler();
    ControlHandler.controlRefresh();
    ControlHandler.controlUnits();
    return this;
  }

  static controlUnits() {
    const controlGroup = document.querySelector('.control__units');
    controlGroup.addEventListener('click', (event) => {
      const enabledButton = controlGroup.querySelector('.control__button:not(.control__button_disabled)');
      enabledButton.classList.add('control__button_disabled');
      event.target.classList.remove('control__button_disabled');
    });
  }

  static controlRefresh() {
    const refreshButton = document.querySelector('.control__button_refresh');
    const refreshButtonIcon = refreshButton.querySelector('.control__button_icon');
    refreshButton.addEventListener('click', () => {
      refreshButtonIcon.classList.toggle('rotate');
      SetAppBackground();
    });
  }
}

export default new ControlHandler();
