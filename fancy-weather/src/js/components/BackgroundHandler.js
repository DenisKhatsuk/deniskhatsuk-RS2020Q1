const API_KEY = 'tU1UjIRY5qx9r1GfNJTqTzaYEeFHY5iY1uHvzPycTLE';
const REQUEST_URL = `https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=nature+summer&client_id=${API_KEY}`;

async function getImageURL() {
  const response = await fetch(REQUEST_URL);
  const { urls: { regular } } = await response.json();
  return regular;
}

async function setBackgroundImage() {
  const backgroundImageURL = await getImageURL();
  const backgroundImage = new Image();
  backgroundImage.src = backgroundImageURL;
  backgroundImage.addEventListener('load', () => {
    document.body.style.backgroundImage = `linear-gradient(0deg, rgba(0,0,0,1) 7%, rgba(0,0,0,0.4) 27%), url(${backgroundImage.src})`;
  });
}

export default {
  setBackgroundImage,
};
