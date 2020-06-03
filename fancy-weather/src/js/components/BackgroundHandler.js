const API_KEY = 'tU1UjIRY5qx9r1GfNJTqTzaYEeFHY5iY1uHvzPycTLE';
const REQUEST_URL = `https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=nature+summer&client_id=${API_KEY}`;

async function getImageURL() {
  const response = await fetch(REQUEST_URL);
  const { urls: { regular } } = await response.json();
  return regular;
}

export default {
  getImageURL,
};
