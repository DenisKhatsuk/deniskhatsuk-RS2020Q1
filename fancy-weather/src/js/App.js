import '../sass/styles.scss';

import setAppBackground from './components/BackgroundHandler';
import getLocationGeocoding from './components/GeocodingHandler';
import { getCurrentDate } from './components/DateHandler';
import { buildHeader, buildMain } from './components/MarkupBuilder';
import ControlHandler from './components/ControlHandler';
import SearchHandler from './components/SearchHandler';
import LocationHandler from './components/LocationHandler';
import MapHandler from './components/MapHandler';
import ForecastHandler from './components/ForecastHandler';

window.addEventListener('DOMContentLoaded', async () => {
  const state = {
    language: 'en',
    units: localStorage.getItem('units') || 'metric',
    lat: 0,
    lng: 0,
    timer: 0,
  };

  setAppBackground();

  buildHeader();
  buildMain();

  ControlHandler.publishControlBlock('.header > .container', state);
  ControlHandler.startControlFunctions();

  SearchHandler.publishSearchField('.header > .container');

  LocationHandler.init('.main__weather');
  LocationHandler.publishLocationData('.location__date', '.location__place');
  const { loc } = LocationHandler.getLocationData();
  const [userLat, userLng] = loc.split(',');
  state.lat = userLat;
  state.lng = userLng;

  MapHandler.addMapContainer('.main__map');
  MapHandler.init(state.lat, state.lng);
  MapHandler.addCoordinatesContainer('.main__map');
  MapHandler.publishCoordinates(state.lat, state.lng);

  async function addWeatherToPage() {
    ForecastHandler.publishTodayWeather('.forecast__today');
    ForecastHandler.publishForecast('.forecast__upcoming');
  }

  ForecastHandler.init('.main__weather');
  await ForecastHandler.getForecast(state);
  addWeatherToPage();

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
    } = await getLocationGeocoding(searchInputValue);
    state.lat = lat;
    state.lng = lng;
    placeField.textContent = `${formatted}`;
    dateField.remove();
    dateField = document.createElement('div');
    dateField.classList.add('location__date');
    locationElement.append(dateField);
    dateField.textContent = getCurrentDate(timezone);
    clearInterval(state.timer);
    state.timer = setInterval(() => {
      dateField.textContent = getCurrentDate(timezone);
    }, 1000);

    MapHandler.init(lat, lng);
    MapHandler.publishCoordinates(lat, lng);
    await ForecastHandler.getForecast(state);
    addWeatherToPage();
  });

  const unitsGroup = document.querySelector('.control__units');
  unitsGroup.addEventListener('click', async (event) => {
    const unitClicked = event.target.getAttribute('data-type');
    if (unitClicked !== state.units) {
      state.units = unitClicked;
      await ForecastHandler.getForecast(state);
      addWeatherToPage();
      localStorage.setItem('units', unitClicked);
    }
  });
});
