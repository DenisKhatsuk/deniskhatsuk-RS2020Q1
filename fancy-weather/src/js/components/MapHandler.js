// https://docs.mapbox.com/api/maps/

import mapboxgl from 'mapbox-gl';

const API_KEY = 'pk.eyJ1IjoiZGVuaXNraGF0c3VrIiwiYSI6ImNrYXdjd2EzeTAzNGYycm12Y2JnaTlnbXIifQ.PfUx8xzMFLiDiQumqMpAFg';

class MapHandler {
  init(lat = 55.665957, lng = 12.550343) {
    mapboxgl.accessToken = API_KEY;
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/deniskhatsuk/ckawq5ktq3qqs1ikera49v01n',
      center: [lng, lat], // starting position [lng, lat]
      zoom: 11,
    });
    // eslint-disable-next-line
    const marker = new mapboxgl.Marker()
      .setLngLat([lng, lat])
      .addTo(map);
    return this;
  }

  addMapContainer(parentElement = 'body') {
    const parent = document.querySelector(`${parentElement}`);
    const mapSection = document.createElement('section');
    mapSection.classList.add('map');
    mapSection.setAttribute('id', 'map');
    parent.append(mapSection);
    return this;
  }

  addCoordinatesContainer(parentElement = 'body') {
    const parent = document.querySelector(`${parentElement}`);
    const coordinates = document.createElement('section');
    coordinates.classList.add('map__coordinates', 'coordinates');
    coordinates.innerHTML = `
      <div class="coordinates__lat"></div>
      <div class="coordinates__lng"></div>
    `;
    parent.append(coordinates);
    return this;
  }

  publishCoordinates(lat, lng) {
    const latitudeElement = document.querySelector('.coordinates__lat');
    const longitudeElement = document.querySelector('.coordinates__lng');
    const latitude = MapHandler.getCoordinateInDegMinFormat(lat);
    const longitude = MapHandler.getCoordinateInDegMinFormat(lng);
    latitudeElement.textContent = `Latitude: ${latitude}`;
    longitudeElement.textContent = `Longitude: ${longitude}`;
    return this;
  }

  static getCoordinateInDegMinFormat(coordinate) {
    const minutesInDegree = 60;
    const degrees = Math.floor(coordinate);
    const minutes = Math.floor((coordinate - degrees) * minutesInDegree);
    const coordinateFormatted = `${degrees}°${minutes}'`;
    return coordinateFormatted;
  }
}

export default new MapHandler();
