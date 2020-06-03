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
      date: dateUnix,
      temp,
      feels_like, /* eslint-disable-line */
      humidity,
      description,
    } = todayWeather;
    const todayDate = Date.getShortDate(dateUnix);
    const temperature = Math.round(temp);
    const feels = Math.round(feels_like);

    todayWeatherContainer.textContent = `
      Date: ${todayDate},
      Temperature: ${temperature}°C,
      Feels like: ${feels}°C,
      Humidity: ${humidity}%,
      ${description}`;
    return this;
  }

  publishForecast(parentSelector = 'body', forecast) {
    const forecastContainer = document.querySelector(parentSelector);
    const [
      {
        date1: dateUnix1,
        tempDay1,
        tempNight1,
        humidity1,
        description1,
      },
      {
        date2: dateUnix2,
        tempDay2,
        tempNight2,
        humidity2,
        description2,
      },
      {
        date3: dateUnix3,
        tempDay3,
        tempNight3,
        humidity3,
        description3,
      },
    ] = forecast;
    const day1 = Date.getShortDate(dateUnix1);
    const day2 = Date.getShortDate(dateUnix2);
    const day3 = Date.getShortDate(dateUnix3);
    const temperatureDay1 = Math.round(tempDay1);
    const temperatureNight1 = Math.round(tempNight1);
    const temperatureDay2 = Math.round(tempDay2);
    const temperatureNight2 = Math.round(tempNight2);
    const temperatureDay3 = Math.round(tempDay3);
    const temperatureNight3 = Math.round(tempNight3);

    forecastContainer.textContent = `
      Date: ${day1},
      Temperature: ${temperatureDay1}°C / ${temperatureNight1}°C,
      Humidity: ${humidity1}%,
      ${description1}
      Date: ${day2},
      Temperature: ${temperatureDay2}°C / ${temperatureNight2}°C,
      Humidity: ${humidity2}%,
      ${description2}
      Date: ${day3},
      Temperature: ${temperatureDay3}°C / ${temperatureNight3}°C,
      Humidity: ${humidity3}%,
      ${description3}`;
    return this;
  }

  async getForecast(lat, long, lang, units) {
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
        weather: [
          {
            description,
          },
        ],
      },
      daily: [,
        {
          dt: date1,
          temp: {
            day: tempDay1,
            night: tempNight1,
          },
          humidity: humidity1,
          weather: [
            {
              description: description1,
            },
          ],
        },
        {
          dt: date2,
          temp: {
            day: tempDay2,
            night: tempNight2,
          },
          humidity: humidity2,
          weather: [
            {
              description: description2,
            },
          ],
        },
        {
          dt: date3,
          temp: {
            day: tempDay3,
            night: tempNight3,
          },
          humidity: humidity3,
          weather: [
            {
              description: description3,
            },
          ],
        },
      ],
    } = await request.json();
    return [
      { latitude, longitude },
      {
        date,
        temp,
        feels_like,
        humidity,
        description,
      },
      {
        date1,
        tempDay1,
        tempNight1,
        humidity1,
        description1,
      },
      {
        date2,
        tempDay2,
        tempNight2,
        humidity2,
        description2,
      },
      {
        date3,
        tempDay3,
        tempNight3,
        humidity3,
        description3,
      },
    ];
  }
}

export default new ForecastHandler();
