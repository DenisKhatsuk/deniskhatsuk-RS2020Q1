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

  addMapContainer(parentElement) {
    const parent = document.querySelector(`${parentElement}`);
    const mapSection = document.createElement('section');
    mapSection.classList.add('map');
    mapSection.setAttribute('id', 'map');
    parent.append(mapSection);
    return this;
  }
}

export default new MapHandler();
