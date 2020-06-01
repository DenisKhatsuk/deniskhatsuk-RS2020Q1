import '../sass/styles.scss';

import Background from './components/BackgroundHandler';
import Date from './components/DateHandler';
import LocationHandler from './components/LocationHandler';
import MapHandler from './components/MapHandler';

window.addEventListener('DOMContentLoaded', async () => {
  const backgroundImageURL = await Background.getImageURL();
  const backgroundImage = new Image();
  backgroundImage.src = backgroundImageURL;
  backgroundImage.addEventListener('load', () => {
    document.body.style.backgroundImage = `url(${backgroundImage.src})`;
  });

  LocationHandler.init('.main');
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

  MapHandler.init('.main', lng, lat);
});
