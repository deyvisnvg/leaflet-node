const express = require('express');
const engine = require('ejs-mate'); //Derivado de ejs
const path = require('path'); //Para especificar las rutas tanto con '/' ó '\' y sea multiplataforma.
const { PORT } = require("../config"); //sustraemos el puerto establecido en el 'config.json'
const socketIO = require('socket.io'); //Debemos instalarlo
const http = require('http'); //Requerimos el módulo 'http' para poder crear un servidor

//Inicializamos, instanciamos la aplicación.
const app = express();
const server = http.createServer(app); // Creamos un servidor con http

//Importamos nuestro módulo de sockets
const io = socketIO(server); //Esto... va ha permitirnos conectarnos con el Cliente

//Configuración del motor de Plantillas - Settings
app.engine('ejs', engine); //'ejs': nombre del motor //Para utilizar este motor de Plantillas, hay una propiedad en express llamada engine
app.set('view engine', 'ejs'); //Es como decirle voy a establecer en mi aplicación un motor de plantillas, de esta forma utilizamos ejs-mate
app.set('views', path.join(__dirname, 'views')); //método de 'path.join' que permite unir directorios. //Establecemos la dirección de nuestra plantilla para ejecutarse en el navegador
console.log("ruta actual: " + __dirname);

app.use(require("./routes")); //De esta forma le damos a un método de express esta ruta(require) para que se ejecute 'router'
// require("./routes")(app)

require("./sockets")(io);

//express.static(): Le dice a express donde estan mis archivos estáticos.
//Esto sirve para que ahora desde cualquier archivo de nuestras vistas nosotros simplemente vamos a llamar la carpeta 'css' o 'js' y podemos acceder a todos los archivos de adentro
app.use(express.static(path.join(__dirname, 'public')));//Le estamos diciendo: Aplicacion utiliza archivos estáticos de express la dirección es esta la carpeta 'public'

function init() {
    console.log("Inicializando Servidor...");
    //Inicializamos el Servidor en el puerto 3000
    server.listen(PORT, () => {
        console.log(`El Servidor esta activo en el puerto ${ PORT }`);
    });
}

init();




/*
DEPENDENCIAS, módulos A UTILIZAR:
- express 
- ejs-mate : motor de plantilla - es una variante.
- socket.io

comando: npm install i express ejs-mate socket.io
*/

//Instalamos nodemon como dependencia de Desarrollo: npm install nodemon -D