// Find API Docs here https://openweathermap.org/api

import Date from './DateHandler';

const API_KEY = '5bc699ca9036e60c3f7d417600991566';

class ForecastHandler {
  constructor() {
    this.lat = '0';
    this.long = '0';
    this.lang = 'en';
    this.units = 'metric';
  }

  init(parentSelector = 'body') {
    const parent = document.querySelector(`${parentSelector}`);
    ForecastHandler.addForecastContainer(parent);
    return this;
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

  publishTodayWeather(parentSelector = 'body', todayWeather) {
    const todayWeatherContainer = document.querySelector(parentSelector);
    const {
      temp,
      feels_like, /* eslint-disable-line */
      humidity,
      wind_speed, /* eslint-disable-line */
      description,
      icon,
    } = todayWeather;
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
    return this;
  }

  publishForecast(parentSelector = 'body', forecast) {
    const forecastContainer = document.querySelector(parentSelector);
    const forecastFragment = new DocumentFragment();
    forecast.splice(3);
    forecast.forEach((dayWeather) => {
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
      const day = Date.getShortDate(dateUnix);
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

    forecastContainer.appendChild(forecastFragment);
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
    return {
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
  }
}

export default new ForecastHandler();
