// let latitud = -8.3929;
// let longitud = -74.5826;
let latitud = -11.4024448;
let longitud = -75.6850688;

//Inicializamos un mapa
const map = L.map('mapa').setView([latitud, longitud], 6); // L.map('mapa'): Aquí le decimos en que elemento irá montado nuestro mapa // .setView([latitud,longitud], zoom): Establecemos la vista a traves de un array
const tileURL = 'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png';
const tileURL2 = 'http://b.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png';
const tileURL3 = 'http://tile.memomaps.de/tilegen/{z}/{x}/{y}.png';

L.tileLayer(tileURL).addTo(map); //Hacemos uso de un tileLayer que son las plantillas de mapas que vamos a utilizar // Utilizamos .addTo para decirle a tileLayer(plantilla) a que mapa va pertenecer o a que elemento, o en donde va ir montado.

//Inicializamos la conection socket.io //Al ejecutarlo este se conecta al servidor.
const socket = io.connect();

/*Definir una clase de ícono
¿Qué pasa si necesitamos crear varios íconos que tienen mucho en común?
¡Definamos nuestra propia clase de icono que contiene las opciones compartidas, heredando de L.Icon! 
*/
var LeafIcon = L.Icon.extend({
    options: {
        shadowUrl: 'imagen/leaf-shadow.png',
        iconSize: [38, 95], // size of the icon
        shadowSize: [50, 64], // size of the shadow
        iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
        shadowAnchor: [4, 62],  // the same for the shadow
        popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
    }
});

map.locate({ enableHeighAccuracy: true }); //Utilizamos el metodo llamado map.locate("") que recibe una propiedad(enableHeighAccuracy) que habilita o hace que la localización sea mas precisa //Al activar este método lo que hace leaflet es utilizar el Api de geolocalización del navegador, para localizar mejor al usuario.
map.on("locationfound", event => { //Evento de 'localización encontrada'
    console.log("Connected");
    let coords = [event.latlng.lat, event.latlng.lng];
    console.log("cliente", event.latlng.lat, event.latlng.lng);

    const greenIcon = new LeafIcon({ //Instanciamos la clase de icono de leaflet
        iconUrl: 'imagen/leaf-green.png',
    });

    const marker = L.marker(coords, { //Para agregarle un marcador a nuestro mapa
        icon: greenIcon
    });
    marker.bindPopup('You are Here!'); //Mensaje del marcador(marker)
    map.addLayer(marker); //Le decimos que a nuestro mapa vamos a agregarle una capa nueva que es el marker.

    //console.log(event)
    //Vamos emitir un evento al servidor para que escuche estas coordenadas, para que cuando nuestros clientes se conecten a mi aplicativo pueda visualizar del mismo modo mi ubicación en el mapa.
    socket.emit("userCoordinates", event.latlng);
})

socket.on("newUserCoordinates", coords => {
    console.log("New user connected22");
    console.log(coords.lat + 0.1, coords.lng + 0.1);

    const greenIcon = new LeafIcon({
        iconUrl: 'imagen/leaf-green.png',
    });

    const marker = L.marker([coords.lat + 0.1, coords.lng + 0.1], {
        icon: greenIcon
    });
    marker.bindPopup('Posición actual!');
    map.addLayer(marker);
});




// const marker = L.marker([latitud, longitud]); //Para agregarle un marcador a nuestro mapa
// marker.bindPopup('Posición actual!'); //Mensaje del marcador(marker)
// map.addLayer(marker); //Le decimos que a nuestro mapa vamos a agregarle una capa nueva que es el marker.


/*
Creando el Servidor http e inicializando websocket ().
===================================================
Estos marcadores vamos hacerlo que aparescan dependiendo de un evento, cada ves que un nuevo usuario se conecta,
Entonces vamos a utilizar el protocolo de websocket para que mi servidor http pueda enviar eventos en tiempo real
y los demas clientes que se conecten puedan recibir esos eventos en tiempo real y crear marcadores cuando escuchen
esos eventos
*/