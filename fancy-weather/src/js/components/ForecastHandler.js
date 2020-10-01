// Public methods:
//  init(parentSelector)
//    ** adds container for forecast
//    * parentSelector sets parent element inside which container for forecast is added
//  getForecast(state)
//    **  makes weather request to API, saves returned data in class weather property and
//    **  returns weather data as object
//    *   state object should include:
//    *     lat,
//    *     lng,
//    *     language,
//    *     units.
//  publishTodayWeather(parentSelector)
//    ** publishes today's weather to parentSelector element. Default selector is 'body'
//  publishForecast(parentSelector)
//    ** publishes forecast to parentSelector element. Default selector is 'body'
// API used:
//  https://openweathermap.org/api

import { getShortDate } from './DateHandler';

const API_KEY = '5bc699ca9036e60c3f7d417600991566';

class ForecastHandler {
  constructor() {
    this.lat = '0';
    this.long = '0';
    this.lang = 'en';
    this.units = 'metric';
    this.weather = {};
    this.errorMessage = 'Something went wrong during forecast request. Please try again later';
  }

  static addForecastContainer(parent) {
    const forecastSection = document.createElement('section');
    forecastSection.classList.add('forecast');
    forecastSection.innerHTML = `
    <div class="forecast__today">
    </div>
    <div class="forecast__upcoming">
    </div>
    `;
    parent.append(forecastSection);
  }

  /* Public */

  init(parentSelector = 'body') {
    const parent = document.querySelector(`${parentSelector}`);
    ForecastHandler.addForecastContainer(parent);
    return this;
  }

  publishTodayWeather(parentSelector = 'body') {
    const todayWeatherContainer = document.querySelector(parentSelector);
    if (this.weather.todayWeather) {
      const {
        temp,
        feels_like, /* eslint-disable-line */
        humidity,
        wind_speed, /* eslint-disable-line */
        description,
        icon,
      } = this.weather.todayWeather;
      const temperature = Math.round(temp);
      const feels = Math.round(feels_like);
      const wind = Math.round(wind_speed);

      todayWeatherContainer.innerHTML = `
        <div class="forecast__today_temp">${temperature}°</div>
        <div class="forecast__today_details">
          <div class="forecast__today_icon" style="background-image: url('http://openweathermap.org/img/wn/${icon}@4x.png')"></div>
          <div>${description}</div>
          <div>Feels like: ${feels}°C</div>
          <div>Wind: ${wind} m/s</div>
          <div>Humidity: ${humidity}%</div>
        </div>
        `;
    } else {
      todayWeatherContainer.innerHTML = `
        <div class="forecast__error">
          ${this.errorMessage}
        </div>
        `;
    }
    return this;
  }

  publishForecast(parentSelector = 'body') {
    const forecastContainer = document.querySelector(parentSelector);
    if (this.weather.forecast) {
      const forecastFragment = new DocumentFragment();
      this.weather.forecast.splice(3);
      this.weather.forecast.forEach((dayWeather) => {
        const {
          dt: dateUnix,
          temp: {
            day: tempDay,
            night: tempNight,
          },
          humidity,
          weather: [
            {
              icon,
            },
          ],
        } = dayWeather;
        const day = getShortDate(dateUnix);
        const temperatureDay = Math.round(tempDay);
        const temperatureNight = Math.round(tempNight);
        const dayStructure = document.createElement('div');
        dayStructure.classList.add('forecast__upcoming_day');
        dayStructure.innerHTML = `
          <div class="forecast__upcoming_header">
            <div>${day}</div>
            <div class="forecast__upcoming_icon" style="background-image: url('http://openweathermap.org/img/wn/${icon}@2x.png')"></div>
          </div>
          <div class="forecast__upcoming_main">
            <div class="forecast__upcoming_temp-day">${temperatureDay}°</div>
            <div class="forecast__upcoming_temp-night">${temperatureNight}°</div>
            <div class="forecast__upcoming_humidity">${humidity}%</div>
          </div>
        `;
        forecastFragment.appendChild(dayStructure);
      });
      forecastContainer.innerHTML = '';
      forecastContainer.appendChild(forecastFragment);
    }
    return this;
  }

  async getForecast(state) {
    const {
      lat,
      lng: long,
      language: lang,
      units,
    } = state;
    this.lat = lat || this.lat;
    this.long = long || this.long;
    this.lang = lang || this.lang;
    this.units = units || this.units;
    const REQUEST_URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${this.lat}&lon=${this.long}&lang=${this.lang}&units=${this.units}&APPID=${API_KEY}`;
    const request = await fetch(REQUEST_URL);
    if (!request.ok) {
      const { message } = await request.json();
      /* eslint no-console: ["error", { allow: ["warn"] }] */
      console.warn(`Bad response from forecast server. Server reply: "${message}"`);
      return false;
    }
    const {
      lat: latitude,
      lon: longitude,
      current: {
        dt: date,
        temp,
        feels_like, /* eslint-disable-line */
        humidity,
        wind_speed, /* eslint-disable-line */
        weather: [
          {
            description,
            icon,
          },
        ],
      },
      daily,
    } = await request.json();
    this.weather = {
      geolocation: { latitude, longitude },
      todayWeather:
      {
        date,
        temp,
        feels_like,
        humidity,
        wind_speed,
        description,
        icon,
      },
      forecast: daily,
    };
    return this.weather;
  }
}

export default new ForecastHandler();
