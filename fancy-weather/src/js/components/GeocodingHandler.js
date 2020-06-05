const API_KEY = '1c60758b72be467d829c9e28077e760b';

async function getLocationGeocoding(city) {
  const requestURL = `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=${API_KEY}&pretty=1&no_annotations=1`;
  const response = await fetch(requestURL);
  const {
    results: [
      {
        formatted,
        geometry:
          {
            lat,
            lng,
          },
      },
    ],
  } = await response.json();
  return { formatted, lat, lng };
}

export default {
  getLocationGeocoding,
};