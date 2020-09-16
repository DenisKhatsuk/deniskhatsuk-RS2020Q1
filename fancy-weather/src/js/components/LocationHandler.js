// Public methods:
//  init(parentSelector)
//    * parentSelector sets parent element inside which container for location is added
//    * request to location API
//    * location data is stored in locationData property:
//      ** loc      - string with coordinates;
//      ** city     - string with city name;
//      ** country  - string with country name;
//      ** timezone - string with timezone;
//  publishLocationData(dateContainer, locationContainer)
//    * dateContainer sets selector for date/time content
//    * locationContainer sets selector for city/country content
//  getLocationData()
//    * returns current locationData object
//
// API used:
//  https://ipinfo.io/developers

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

  async publishLocationData(dateContainer, locationContainer) {
    const dateField = document.querySelector(dateContainer);
    const placeField = document.querySelector(locationContainer);
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
