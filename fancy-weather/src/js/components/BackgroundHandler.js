const API_KEY = 'tU1UjIRY5qx9r1GfNJTqTzaYEeFHY5iY1uHvzPycTLE';
const REQUEST_URL = `https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=тфегку+summer&client_id=${API_KEY}`;

async function getImageURL() {
  const response = await fetch(REQUEST_URL);
  const imageData = await response.json();
  const imageURL = imageData.urls.regular;
  return imageURL;
}

export default {
  getImageURL,
};
