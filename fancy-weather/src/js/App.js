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
    ForecastHandler.publishTodayWeather('.forecast__today', weather[1]);
    ForecastHandler.publishForecast('.forecast__upcoming', [weather[2], weather[3], weather[4]]);
  }

  addWeatherToPage(userLat, userLng, state.language, state.units);

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

  // const languageGroup = document.querySelector('.control__language');
  // languageGroup.addEventListener('click', (event) => {
  //   const languageClicked = event.target.getAttribute('data-type');
  //   if (languageClicked !== state.language) {
  //     addWeatherToPage(state.lat, state.lng, languageClicked, state.units);
  //     state.language = languageClicked;
  //   }
  // });
});
