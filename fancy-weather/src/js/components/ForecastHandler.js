// Find API Docs here https://openweathermap.org/api

const API_KEY = '5bc699ca9036e60c3f7d417600991566';

class ForecastHandler {
  constructor() {
    this.city = 'Hrodna';
    this.lang = 'ru';
    this.units = 'metric';
  }

  async getForecast(city, lang, units) {
    this.city = city || this.city;
    this.lang = lang || this.lang;
    this.units = units || this.units;
    const REQUEST_URL = `https://api.openweathermap.org/data/2.5/forecast?q=${this.city}&lang=${this.lang}&units=${this.units}&APPID=${API_KEY}`;
    const request = await fetch(REQUEST_URL);
    const {
      cod,
      message,
      city: {
        coord: {
          lat,
          lon,
        },
      },
      list: [
        {
          dt: date1,
          main: {
            temp: temp1,
            feels_like: feels_like1, /* eslint-disable-line */
            humidity: humidity1,
          },
          weather: [
            {
              description: description1,
            },
          ],
        },
        {
          dt: date2,
          main: {
            temp: temp2,
            feels_like: feels_like2, /* eslint-disable-line */
            humidity: humidity2,
          },
          weather: [
            {
              description: description2,
            },
          ],
        },
        {
          dt: date3,
          main: {
            temp: temp3,
            feels_like: feels_like3, /* eslint-disable-line */
            humidity: humidity3,
          },
          weather: [
            {
              description: description3,
            },
          ],
        },
        {
          dt: date4,
          main: {
            temp: temp4,
            feels_like: feels_like4, /* eslint-disable-line */
            humidity: humidity4,
          },
          weather: [
            {
              description: description4,
            },
          ],
        },
      ],
    } = await request.json();
    // eslint-disable-next-line
    return [
      { cod, message },
      { lat, lon },
      {
        date1,
        temp1,
        feels_like1,
        humidity1,
        description1,
      },
      {
        date2,
        temp2,
        feels_like2,
        humidity2,
        description2,
      },
      {
        date3,
        temp3,
        feels_like3,
        humidity3,
        description3,
      },
      {
        date4,
        temp4,
        feels_like4,
        humidity4,
        description4,
      },
    ];
  }
}

export default new ForecastHandler();
