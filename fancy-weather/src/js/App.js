import '../sass/styles.scss';

import Background from './components/BackgroundHandler';
import Date from './components/DateHandler';
import LocationHandler from './components/LocationHandler';
import MapHandler from './components/MapHandler';
import ForecastHandler from './components/ForecastHandler';
import SearchHandler from './components/SearchHandler';
import GeocodingHandler from './components/GeocodingHandler';

window.addEventListener('DOMContentLoaded', async () => {
  const backgroundImageURL = await Background.getImageURL();
  const backgroundImage = new Image();
  backgroundImage.src = backgroundImageURL;
  backgroundImage.addEventListener('load', () => {
    document.body.style.backgroundImage = `linear-gradient(0deg, rgba(0,0,0,1) 7%, rgba(0,0,0,0.19) 27%), url(${backgroundImage.src})`;
  });

  SearchHandler.publishSearchField('.main > .container');

  LocationHandler.init('.main > .container');
  const dateField = document.querySelector('.location__date');
  const placeField = document.querySelector('.location__place');
  const { city, country, loc } = await LocationHandler.getLocation();
  const locationCoordinates = loc.split(',');
  const [lat, lng] = locationCoordinates;
  placeField.textContent = `${city}, ${country}`;
  dateField.textContent = Date.getCurrentDate();
  setInterval(() => {
    dateField.textContent = Date.getCurrentDate();
  }, 1000);

  MapHandler.addMapContainer('.main > .container');
  MapHandler.init(lat, lng);

  ForecastHandler.init('.main > .container');
  const weather = await ForecastHandler.getForecast(lat, lng);
  ForecastHandler.publishTodayWeather('.forecast__today', weather[1]);
  ForecastHandler.publishForecast('.forecast__upcoming', [weather[2], weather[3], weather[4]]);

  const searchForm = document.querySelector('.search');
  const searchInput = document.querySelector('.search__input');
  searchForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const searchInputValue = searchInput.value;
    const {
      formatted,
      lat: latd,
      lng: long,
    } = await GeocodingHandler.getLocationGeocoding(searchInputValue);
    placeField.textContent = `${formatted}`;
    MapHandler.init(latd, long);
    const requestedWeather = await ForecastHandler.getForecast(latd, long);
    ForecastHandler.publishTodayWeather('.forecast__today', requestedWeather[1]);
    ForecastHandler.publishForecast('.forecast__upcoming', [requestedWeather[2], requestedWeather[3], requestedWeather[4]]);
  });
});
