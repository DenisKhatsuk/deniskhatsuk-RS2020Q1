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
    const [
      {
        date1: dateUnix1,
        tempDay1,
        tempNight1,
        humidity1,
        icon1,
      },
      {
        date2: dateUnix2,
        tempDay2,
        tempNight2,
        humidity2,
        icon2,
      },
      {
        date3: dateUnix3,
        tempDay3,
        tempNight3,
        humidity3,
        icon3,
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

    forecastContainer.innerHTML = `
      <div class="forecast__upcoming_day">
        <div class="forecast__upcoming_header">
          <div>${day1}</div>
          <div class="forecast__upcoming_icon" style="background-image: url('http://openweathermap.org/img/wn/${icon1}@2x.png')"></div>
        </div>
        <div class="forecast__upcoming_main">
          <div class="forecast__upcoming_temp-day">${temperatureDay1}°</div>
          <div class="forecast__upcoming_temp-night">${temperatureNight1}°</div>
          <div class="forecast__upcoming_humidity">${humidity1}%</div>
        </div>
      </div>
      <div class="forecast__upcoming_day">
        <div class="forecast__upcoming_header">
          <div>${day2}</div>
          <div class="forecast__upcoming_icon" style="background-image: url('http://openweathermap.org/img/wn/${icon2}@2x.png')"></div>
        </div>
        <div class="forecast__upcoming_main">
          <div class="forecast__upcoming_temp-day">${temperatureDay2}°</div>
          <div class="forecast__upcoming_temp-night">${temperatureNight2}°</div>
          <div class="forecast__upcoming_humidity">${humidity2}%</div>
        </div>
      </div>
      <div class="forecast__upcoming_day">
        <div class="forecast__upcoming_header">
          <div>${day3}</div>
          <div class="forecast__upcoming_icon" style="background-image: url('http://openweathermap.org/img/wn/${icon3}@2x.png')"></div>
        </div>
        <div class="forecast__upcoming_main">
          <div class="forecast__upcoming_temp-day">${temperatureDay3}°</div>
          <div class="forecast__upcoming_temp-night">${temperatureNight3}°</div>
          <div class="forecast__upcoming_humidity">${humidity3}%</div>
        </div>
      </>
      `;
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
        wind_speed, /* eslint-disable-line */
        weather: [
          {
            description,
            icon,
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
              icon: icon1,
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
              icon: icon2,
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
              icon: icon3,
            },
          ],
        },
      ],
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
      forecast: [
        {
          date1,
          tempDay1,
          tempNight1,
          humidity1,
          description1,
          icon1,
        },
        {
          date2,
          tempDay2,
          tempNight2,
          humidity2,
          description2,
          icon2,
        },
        {
          date3,
          tempDay3,
          tempNight3,
          humidity3,
          description3,
          icon3,
        },
      ]
    };
  }
}

export default new ForecastHandler();
