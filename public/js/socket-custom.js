var socket = io();

//"on" son para escuchar eventos!
socket.on('connect', function () {
    console.log('Conectado al servidor!');
});

socket.on('disconnect', function () {
    console.log('Perdimos conexión con el servidor!');
});

//"emit" son para enviar eventos!
socket.emit('enviarMensaje', {
    usuario: 'Jefry Sánchez',
    mensaje: 'Hola mundo!'
}, function (resp) {
    console.log('Respuesta del server: ', resp);
});

//escuchar eventos
socket.on('enviarMensaje', function (mensaje) {
    console.log('Servidor', mensaje);
});