let socket = io();


let params = new URLSearchParams(window.location.search);

if (!params.has('nombre') || !params.has('sala')) {
    window.location = 'index.html';
    throw new Error('El nombre y sala son necesarios');
}

let usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
};



socket.on('connect', ()=>{
    console.log('Conectado al servidor');

    socket.emit('entrarChat', usuario, (resp)=> {
        // console.log('Usuarios conectados', resp);
        renderizarUsuarios(resp);
    });

});

// escuchar
socket.on('disconnect', ()=>{

    console.log('Perdimos conexión con el servidor');

});


// Enviar información
// socket.emit('crearMensaje', {
//     nombre: 'Fernando',
//     mensaje: 'Hola Mundo'
// }, function(resp) {
//     console.log('respuesta server: ', resp);
// });

// Escuchar información
socket.on('crearMensaje', (mensaje)=>{
    renderizarMensajes(mensaje, false);
    scrollBottom();
});

// Escuchar cambios de usuarios
// cuando un usuario entra o sale del chat
socket.on('listaPersonas', (personas)=>{
    renderizarUsuarios(personas);
});

// Mensajes privados
socket.on('mensajePrivado', (mensaje)=>{

    console.log('Mensaje Privado:', mensaje);

});