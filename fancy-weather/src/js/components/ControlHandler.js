import Dropdown from './ButtonDropdown';
import Background from './BackgroundHandler';

class ControlHandler {
  static createControlMarkup() {
    const ControlMarkup = `
      <div class="control header__control">
        <button class="control__button control__button_refresh" type="button">
          <span class="control__button_icon"></span>
        </button>

        <div class="button-dropdown">
          <button class="button-dropdown__button button-dropdown__button_current" type="button">
            <div class="button-dropdown__button_text">
              EN
            </div>
          </button>
          <div class="button-dropdown__content">
            <button class="button-dropdown__button button-dropdown__button_selected" type="button">EN</button>
            <button class="button-dropdown__button" type="button">RU</button>
            <button class="button-dropdown__button" type="button">BE</button>
          </div>
        </div>

        <div class="control__group">
          <button class="control__button control__button_unit control__button_disabled" type="button">°F</button>
          <button class="control__button control__button_unit" type="button">°С</button>
        </div>

      </div>
    `;
    return ControlMarkup;
  }

  publishControlBlock(parentElement = 'body') {
    const parent = document.querySelector(`${parentElement}`);
    const controlMarkup = ControlHandler.createControlMarkup();
    const controlElement = document.createElement('div');
    controlElement.classList.add('header__control');
    controlElement.innerHTML = controlMarkup;
    parent.append(controlElement);
    return this;
  }

  startControlFunctions() {
    Dropdown.addDropdownHandler();
    ControlHandler.controlRefresh();
    ControlHandler.controlSwitcher();
    return this;
  }

  static controlSwitcher() {
    const controlGroup = document.querySelector('.control__group');
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
      Background.setBackgroundImage();
    });
  }
}

export default new ControlHandler();
