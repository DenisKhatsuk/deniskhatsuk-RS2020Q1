import '../sass/styles.scss';

import Background from './components/BackgroundHandler';
import MarkupBuilder from './components/MarkupBuilder';
import ControlHandler from './components/ControlHandler';
import SearchHandler from './components/SearchHandler';
import LocationHandler from './components/LocationHandler';
import MapHandler from './components/MapHandler';
import ForecastHandler from './components/ForecastHandler';
import GeocodingHandler from './components/GeocodingHandler';

window.addEventListener('DOMContentLoaded', async () => {
  Background.setBackgroundImage();

  MarkupBuilder.buildHeader();
  MarkupBuilder.buildMain();

  ControlHandler.publishControlBlock('.header > .container');
  ControlHandler.startControlFunctions();

  SearchHandler.publishSearchField('.header > .container');

  LocationHandler.init('.main__weather');
  LocationHandler.publishLocationData();
  const { loc } = await LocationHandler.getLocation();
  const locationCoordinates = loc.split(',');
  const [userLat, userLng] = locationCoordinates;

  MapHandler.addMapContainer('.main__map');
  MapHandler.init(userLat, userLng);

  ForecastHandler.init('.main__weather');

  async function addWeatherToPage(latitude, longitude) {
    const weather = await ForecastHandler.getForecast(latitude, longitude);
    ForecastHandler.publishTodayWeather('.forecast__today', weather[1]);
    ForecastHandler.publishForecast('.forecast__upcoming', [weather[2], weather[3], weather[4]]);
  }

  addWeatherToPage(userLat, userLng);

  const searchForm = document.querySelector('.search');
  const searchInput = document.querySelector('.search__input');
  searchForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const placeField = document.querySelector('.location__place');
    const searchInputValue = searchInput.value;
    searchInput.value = '';
    const {
      formatted,
      lat,
      lng,
    } = await GeocodingHandler.getLocationGeocoding(searchInputValue);
    placeField.textContent = `${formatted}`;
    MapHandler.init(lat, lng);
    addWeatherToPage(lat, lng);
  });
});
