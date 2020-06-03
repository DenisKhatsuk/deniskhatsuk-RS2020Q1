import mapboxgl from 'mapbox-gl';

const API_KEY = 'pk.eyJ1IjoiZGVuaXNraGF0c3VrIiwiYSI6ImNrYXdjd2EzeTAzNGYycm12Y2JnaTlnbXIifQ.PfUx8xzMFLiDiQumqMpAFg';

class MapHandler {
  init(parentClass = 'body', lng = 12.550343, lat = 55.665957) {
    const parent = document.querySelector(`${parentClass}`);
    MapHandler.addMapContainer(parent);
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

  static addMapContainer(parent) {
    const mapSection = document.createElement('section');
    mapSection.classList.add('map');
    mapSection.setAttribute('id', 'map');
    parent.append(mapSection);
  }
}

export default new MapHandler();
