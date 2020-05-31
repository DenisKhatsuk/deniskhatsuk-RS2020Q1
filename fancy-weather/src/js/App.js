import '../sass/styles.scss';

import Background from './components/BackgroundHandler';

window.addEventListener('DOMContentLoaded', async () => {
  const backgroundImageURL = await Background.getImageURL();
  const backgroundImage = new Image();
  backgroundImage.src = backgroundImageURL;
  backgroundImage.addEventListener('load', () => {
    document.body.style.backgroundImage = `url(${backgroundImage.src})`;
  });
});
