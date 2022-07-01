let param = new URLSearchParams(window.location.search);

let nombre = param.get('nombre');
let sala = param.get('sala');


//Referencias de JQuery
let divUsuarios = $('#divUsuarios');
let formEnviar = $('#formEnviar');
let txtMensaje = $('#txtMensaje');
let divChatbox = $('#divChatbox');


//Funciones para renderizar usuarios
const renderizarUsuarios = (personas) => {
  console.log(personas);

    let html = '';

  html += '<li>';
  html +=   '<a href="javascript:void(0)" class="active">{" "}Chat de <span>' + param.get('sala') + '</span></a>';
  html += '</li>';

  for(let i = 0; i< personas.length; i++){
    html += '<li>';
    html += '     <a name="'+personas[i].id+'" onclick="obtenerId(this.name);" href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>'+ personas[i].nombre +'<small class="text-success">online</small></span></a>';
    html += '</li>';
  }

  divUsuarios.html(html);

}

function renderizarMensajes( mensaje, yo ){

    let html = '';

    let fecha = new Date(mensaje.fecha);
    let hora = fecha.getHours() + ':' + fecha.getMinutes();

    let adminClass = 'info';

    if(mensaje.nombre === 'Administrador'){
        adminClass = 'danger'
    }

    if(yo){
        html += '<li class="reverse animated fadeIn">';
        html += '    <div class="chat-content">';
        html += '        <h5>'+mensaje.nombre+'</h5>';
        html += '        <div class="box bg-light-inverse">'+mensaje.mensaje+'</div>';
        html += '    </div>';
        html += '    <div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>';
        html += '    <div class="chat-time">'+hora+'</div>';
        html += '</li>';

    }else{
        html += '<li class="animated fadeIn">';

        if(mensaje.nombre !== 'Administrador'){
            html += '    <div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>';
        }

        html += '    <div class="chat-content">';
        html += '        <h5>'+ mensaje.nombre +'</h5>';
        html += '        <div class="box bg-light-'+adminClass+'">'+ mensaje.mensaje +'</div>';
        html += '    </div>';
        html += '    <div class="chat-time">'+hora+'</div>';
        html += '</li>';
    }
    divChatbox.append(html);
}

function obtenerId(id){
    console.log(id);
}

function scrollBottom() {

    // selectors
    let newMessage = divChatbox.children('li:last-child');

    //heights
    let clientHeight = divChatbox.prop('clientHeight');
    let scrollTop = divChatbox.prop('scrollTop');
    let scrollHeight = divChatbox.prop('scrollHeight');
    let newMessageHeight = newMessage.innerHeight();
    let lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        divChatbox.scrollTop(scrollHeight);
    }
}

formEnviar.on('submit', (event)=>{
    event.preventDefault();

    if(txtMensaje.val().trim().length === 0){
        return;
    }

        socket.emit('crearMensaje', {
        nombre: nombre,
        mensaje: txtMensaje.val()
        }, (mensaje)=>{
            txtMensaje.val('').focus();
            renderizarMensajes(mensaje, true);
            scrollBottom();
        });
    
})