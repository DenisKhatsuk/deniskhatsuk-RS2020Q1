import '../sass/styles.scss';

import Background from './components/BackgroundHandler';
import Date from './components/DateHandler';
import MarkupBuilder from './components/MarkupBuilder';
import ControlHandler from './components/ControlHandler';
import SearchHandler from './components/SearchHandler';
import LocationHandler from './components/LocationHandler';
import MapHandler from './components/MapHandler';
import ForecastHandler from './components/ForecastHandler';
import GeocodingHandler from './components/GeocodingHandler';

window.addEventListener('DOMContentLoaded', async () => {
  const state = {
    language: 'en',
    units: localStorage.getItem('units') || 'metric',
    lat: 0,
    lng: 0,
  };

  Background.setBackgroundImage();

  MarkupBuilder.buildHeader();
  MarkupBuilder.buildMain();

  ControlHandler.publishControlBlock('.header > .container', state);
  ControlHandler.startControlFunctions();

  SearchHandler.publishSearchField('.header > .container');

  LocationHandler.init('.main__weather');
  LocationHandler.publishLocationData();
  const { loc } = await LocationHandler.getLocation();
  const locationCoordinates = loc.split(',');
  const [userLat, userLng] = locationCoordinates;
  state.lat = userLat;
  state.lng = userLng;

  MapHandler.addMapContainer('.main__map');
  MapHandler.init(userLat, userLng);
  MapHandler.addCoordinatesContainer('.main__map');
  MapHandler.publishCoordinates(userLat, userLng);

  ForecastHandler.init('.main__weather');

  async function addWeatherToPage(latitude, longitude, language, units) {
    const weather = await ForecastHandler.getForecast(latitude, longitude, language, units);
    ForecastHandler.publishTodayWeather('.forecast__today', weather.todayWeather);
    ForecastHandler.publishForecast('.forecast__upcoming', [weather.forecast[0], weather.forecast[1], weather.forecast[2]]);
  }

  addWeatherToPage(userLat, userLng, state.language, state.units);

  const searchForm = document.querySelector('.search');
  const searchInput = document.querySelector('.search__input');
  searchForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const locationElement = document.querySelector('.location');
    let dateField = document.querySelector('.location__date');
    const placeField = document.querySelector('.location__place');
    const searchInputValue = searchInput.value;
    searchInput.value = '';
    const {
      formatted,
      lat,
      lng,
      name: timezone,
    } = await GeocodingHandler.getLocationGeocoding(searchInputValue);
    placeField.textContent = `${formatted}`;
    dateField.remove();
    dateField = document.createElement('div');
    dateField.classList.add('location__date');
    locationElement.append(dateField);
    dateField.textContent = Date.getCurrentDate(timezone);
    setInterval(() => {
      dateField.textContent = Date.getCurrentDate(timezone);
    }, 1000);

    MapHandler.init(lat, lng);
    MapHandler.publishCoordinates(lat, lng);
    addWeatherToPage(lat, lng, state.language, state.units);
    state.lat = lat;
    state.lng = lng;
  });

  const unitsGroup = document.querySelector('.control__units');
  unitsGroup.addEventListener('click', async (event) => {
    const unitClicked = event.target.getAttribute('data-type');
    if (unitClicked !== state.units) {
      const currentCity = document.querySelector('.location__place').textContent;
      const {
        lat,
        lng,
      } = await GeocodingHandler.getLocationGeocoding(currentCity);
      addWeatherToPage(lat, lng, state.language, unitClicked);
      state.units = unitClicked;
      localStorage.setItem('units', unitClicked);
    }
  });
});
