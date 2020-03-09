module.exports = io => {
    io.on("connection", socket => {
        console.log("New user connected!");
        socket.on("userCoordinates", coords => {
            //Como quiero enviarle estos datos(coordenadas) a todos nuestros usuarios conectados,
            //vamos a utilizar desde socket mismo un evento llamado 'socket.broadcast()': Esto es como decirle que quiero transmitirle un mensaje a todos los usuarios conectados, excepto a mí porque obviamente yo ya tengo los datos.
            socket.broadcast.emit("newUserCoordinates", coords); 
                console.log("servidor", coords);
        });
    });
}