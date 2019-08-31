let latitud = -8.3791500;
let longitud = -74.5538700;

//Inicializamos un mapa
const map = L.map('mapa').setView([latitud, longitud], 13); // L.map('mapa'): Aquí le decimos en que elemento irá montado nuestro mapa // .setView([latitud,longitud], zoom): Establecemos la vista a traves de un array
const tileURL = 'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png';
const tileURL2 = 'http://b.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png';

L.tileLayer(tileURL2).addTo(map); //Hacemos uso de un tileLayer que son las plantillas de mapas que vamos a utilizar // Utilizamos .addTo para decirle a tileLayer(plantilla) a que mapa va pertenecer o a que elemento, o en donde va ir montado.

//Inicializamos la conection socket.io //Al ejecutarlo este se conecta al servidor.
const socketIO = io();

map.locate({enableHeighAccuracy: true}); //Utilizamos el metodo llamado L.locate("") que recibe una propiedad(enableHeighAccuracy) que habilita o hace que la localización sea mas precisa //Al activar este método lo que hace leaflet es utilizar el Api de geolocalización del navegador, para localizar mejor al usuario.
map.on("locationfound", event => { //Evento de 'localización encontrada'
    let coords = [event.latlng.lat, event.latlng.lng];
    const marker = L.marker(coords); //Para agregarle un marcador a nuestro mapa
    marker.bindPopup('You are Here!'); //Mensaje del marcador(marker)
    map.addLayer(marker); //Le decimos que a nuestro mapa vamos a agregarle una capa nueva que es el marker.
    console.log(event)
})

const marker = L.marker([latitud, longitud]); //Para agregarle un marcador a nuestro mapa
marker.bindPopup('Posición actual!'); //Mensaje del marcador(marker)
map.addLayer(marker); //Le decimos que a nuestro mapa vamos a agregarle una capa nueva que es el marker.


/*
Estos marcadores vamos hacerlo que aparescan dependiendo de un evento, cada ves que un nuevo usuario se conecta,
Entonces vamos a utilizar el protocolo de websocket para que mi servidor http pueda enviar eventos en tiempo real 
y los demas clientes que se conecten puedan recibir esos eventos en tiempo real y crear marcadores cuando escuchen 
esos eventos
*/