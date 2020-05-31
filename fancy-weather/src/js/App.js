import '../sass/styles.scss';

import Background from './components/BackgroundHandler';
import Date from './components/DateHandler';

window.addEventListener('DOMContentLoaded', async () => {
  const backgroundImageURL = await Background.getImageURL();
  const backgroundImage = new Image();
  backgroundImage.src = backgroundImageURL;
  backgroundImage.addEventListener('load', () => {
    document.body.style.backgroundImage = `url(${backgroundImage.src})`;
  });

  const dateField = document.querySelector('.location__date');
  dateField.textContent = Date.getCurrentDate();
  setInterval(() => {
    dateField.textContent = Date.getCurrentDate();
  }, 1000);
});
