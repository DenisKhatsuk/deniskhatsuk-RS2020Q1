import Date from './DateHandler';

const API_KEY = '9a5f3199e9ff19';

class LocationHandler {
  constructor() {
    this.REQUEST_URL = `https://ipinfo.io/json?token=${API_KEY}`;
  }

  init(parentSelector = 'body') {
    const parent = document.querySelector(`${parentSelector}`);
    LocationHandler.addLocationContainer(parent);
    return this;
  }

  static addLocationContainer(parent) {
    const locationSection = document.createElement('section');
    locationSection.classList.add('location');
    locationSection.innerHTML = `
      <div class="location__place"></div>
      <div class="location__date"></div>
    `;
    parent.append(locationSection);
  }

  async publishLocationData() {
    const dateField = document.querySelector('.location__date');
    const placeField = document.querySelector('.location__place');
    const { city, country } = await this.getLocation();
    placeField.textContent = `${city}, ${country}`;
    dateField.textContent = Date.getCurrentDate();
    setInterval(() => {
      dateField.textContent = Date.getCurrentDate();
    }, 1000);
  }

  async getLocation() {
    const response = await fetch(this.REQUEST_URL);
    return response.json();
  }
}

export default new LocationHandler();
