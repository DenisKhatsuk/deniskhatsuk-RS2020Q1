// https://ipinfo.io/developers

import Date from './DateHandler';

const API_KEY = '9a5f3199e9ff19';

class LocationHandler {
  constructor() {
    this.REQUEST_URL = `https://ipinfo.io/json?token=${API_KEY}`;
    this.locationData = {
      loc: localStorage.getItem('loc') || '53.6884,23.8258',
      city: localStorage.getItem('city') || 'Grodno',
      country: localStorage.getItem('country') || 'BY',
      timezone: localStorage.getItem('timezone') || 'Europe/Minsk',
    };
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

  static async getLocation(REQUEST_URL) {
    try {
      const response = await fetch(REQUEST_URL);
      if (!response.ok) {
        throw new Error('Bad response from server. Location detection failed');
      } else {
        return response.json();
      }
    } catch (error) {
      /* eslint no-console: ["error", { allow: ["warn"] }] */
      console.warn(error.message);
      return false;
    }
  }

  static setLocationData(fields, locationDataLink) {
    const locationData = locationDataLink;
    fields.forEach((field) => {
      locationData.field = field || locationData.field;
    });
  }

  static setLocalStorageData(fields, locationDataLink) {
    const locationData = locationDataLink;
    fields.forEach((field) => {
      localStorage.setItem(field, locationData.field);
    });
  }

  /* Public */

  async init(parentSelector = 'body') {
    const parent = document.querySelector(`${parentSelector}`);
    LocationHandler.addLocationContainer(parent);
    const {
      city,
      country,
      loc,
      timezone,
    } = await LocationHandler.getLocation(this.REQUEST_URL);
    LocationHandler.setLocationData([city, country, loc, timezone], this.locationData);
    LocationHandler.setLocalStorageData([city, country, loc, timezone], this.locationData);
    return this;
  }

  async publishLocationData() {
    const dateField = document.querySelector('.location__date');
    const placeField = document.querySelector('.location__place');
    placeField.textContent = `${this.locationData.city}, ${this.locationData.country}`;
    dateField.textContent = Date.getCurrentDate(this.locationData.timezone);
    setInterval(() => {
      dateField.textContent = Date.getCurrentDate(this.locationData.timezone);
    }, 1000);
  }

  getLocationData() {
    return this.locationData;
  }
}

export default new LocationHandler();
