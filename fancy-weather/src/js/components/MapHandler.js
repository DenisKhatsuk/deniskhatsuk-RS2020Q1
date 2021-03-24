// Public methods:
//  init(lat, lng, parentElement)
//    ** creates container for map and coordinates inside parentElement
//    ** adds map and coordinates inside created containers accordingly
// API used:
//  https://docs.mapbox.com/api/maps/

import mapboxgl from 'mapbox-gl';

const API_KEY = 'pk.eyJ1IjoiZGVuaXNraGF0c3VrIiwiYSI6ImNrYXdjd2EzeTAzNGYycm12Y2JnaTlnbXIifQ.PfUx8xzMFLiDiQumqMpAFg';

class MapHandler {
  static addMapContainer(parentElement) {
    const parent = document.querySelector(`${parentElement}`);
    const mapSection = document.createElement('section');
    mapSection.classList.add('map');
    mapSection.setAttribute('id', 'map');
    parent.append(mapSection);
    return this;
  }

  static getCoordinateInDegMinFormat(coordinate) {
    const minutesInDegree = 60;
    const degrees = Math.floor(coordinate);
    const minutes = Math.floor((coordinate - degrees) * minutesInDegree);
    const coordinateFormatted = `${degrees}°${minutes}'`;
    return coordinateFormatted;
  }

  static addCoordinatesContainer(parentElement = 'body') {
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

  static publishCoordinates(lat, lng) {
    const latitudeElement = document.querySelector('.coordinates__lat');
    const longitudeElement = document.querySelector('.coordinates__lng');
    const latitude = MapHandler.getCoordinateInDegMinFormat(lat);
    const longitude = MapHandler.getCoordinateInDegMinFormat(lng);
    latitudeElement.textContent = `Latitude: ${latitude}`;
    longitudeElement.textContent = `Longitude: ${longitude}`;
    return this;
  }

  /* Public */

  init(lat = 55.665957, lng = 12.550343, parentElement = 'body') {
    MapHandler.addMapContainer(parentElement);
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
    MapHandler.addCoordinatesContainer(parentElement);
    MapHandler.publishCoordinates(lat, lng);
    return this;
  }
}

export default new MapHandler();
