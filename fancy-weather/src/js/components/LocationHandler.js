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

  async getLocation() {
    const response = await fetch(this.REQUEST_URL);
    return response.json();
  }
}

export default new LocationHandler();
