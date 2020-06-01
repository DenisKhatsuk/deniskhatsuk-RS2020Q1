import mapboxgl from 'mapbox-gl';

const API_KEY = 'pk.eyJ1IjoiZGVuaXNraGF0c3VrIiwiYSI6ImNrYXdjd2EzeTAzNGYycm12Y2JnaTlnbXIifQ.PfUx8xzMFLiDiQumqMpAFg';

class MapHandler {
  constructor() {
    this.longitude = '12.550343';
    this.latitude = '55.665957';
  }

  init(parentClass = 'body') {
    const parent = document.querySelector(`${parentClass}`);
    MapHandler.addMapContainer(parent);
    mapboxgl.accessToken = API_KEY;
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/deniskhatsuk/ckawq5ktq3qqs1ikera49v01n',
      center: [this.longitude, this.latitude], // starting position [lng, lat]
      zoom: 10,
    });
    // eslint-disable-next-line
    const marker = new mapboxgl.Marker()
      .setLngLat([this.longitude, this.latitude])
      .addTo(map);
  }

  static addMapContainer(parent) {
    const mapSection = document.createElement('section');
    mapSection.classList.add('map');
    mapSection.setAttribute('id', 'map');
    parent.append(mapSection);
  }
}

export default new MapHandler();
