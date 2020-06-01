const API_KEY = '9a5f3199e9ff19';
const REQUEST_URL = `https://ipinfo.io/json?token=${API_KEY}`;

async function getLocation() {
  const response = await fetch(REQUEST_URL);
  const locationData = response.json();
  return locationData;
}

export default {
  getLocation,
};
