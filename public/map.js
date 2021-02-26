/* eslint-disable operator-linebreak */
/* eslint-disable no-undef */
mapboxgl.accessToken =
  'pk.eyJ1IjoicmRrZWxsZXk4IiwiYSI6ImNraWNjM2FlcTA5bmkycnA5c21zNTdnZXkifQ.w1YeMutz9BOnTilDiChzyw';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/light-v10',
  center: [-117.38406573200766, 33.959432542235845],
  zoom: 9,
});

map.on('click', (e) => {
  // The event object (e) contains information like the
  // coordinates of the point on the map that was clicked.
  console.log(e.lngLat);
});
