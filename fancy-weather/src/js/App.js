import '../sass/styles.scss';

import Background from './components/BackgroundHandler';
import LocationHandler from './components/LocationHandler';
import MapHandler from './components/MapHandler';
import ForecastHandler from './components/ForecastHandler';
import SearchHandler from './components/SearchHandler';
import GeocodingHandler from './components/GeocodingHandler';

window.addEventListener('DOMContentLoaded', async () => {
  Background.setBackgroundImage();

  SearchHandler.publishSearchField('.main > .container');

  LocationHandler.init('.main > .container');
  LocationHandler.publishLocationData();
  const { loc } = await LocationHandler.getLocation();
  const locationCoordinates = loc.split(',');
  const [userLat, userLng] = locationCoordinates;

  MapHandler.addMapContainer('.main > .container');
  MapHandler.init(userLat, userLng);

  ForecastHandler.init('.main > .container');
  const weather = await ForecastHandler.getForecast(userLat, userLng);
  ForecastHandler.publishTodayWeather('.forecast__today', weather[1]);
  ForecastHandler.publishForecast('.forecast__upcoming', [weather[2], weather[3], weather[4]]);

  const searchForm = document.querySelector('.search');
  const searchInput = document.querySelector('.search__input');
  searchForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const placeField = document.querySelector('.location__place');
    const searchInputValue = searchInput.value;
    const {
      formatted,
      lat,
      lng,
    } = await GeocodingHandler.getLocationGeocoding(searchInputValue);
    placeField.textContent = `${formatted}`;
    MapHandler.init(lat, lng);
    const requestedWeather = await ForecastHandler.getForecast(lat, lng);
    ForecastHandler.publishTodayWeather('.forecast__today', requestedWeather[1]);
    ForecastHandler.publishForecast('.forecast__upcoming', [requestedWeather[2], requestedWeather[3], requestedWeather[4]]);
  });
});
