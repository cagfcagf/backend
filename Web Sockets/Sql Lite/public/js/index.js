const socket = io.connect()


function addMessage(e) {
    const mensaje = {
        name: document.getElementById('username').value,
        chat: document.getElementById('texto').value
    };
    socket.emit('new-message', mensaje);
    return false;
}



socket.on('mensajes', msjs => {
    const mensajesHTML = msjs
        .map(msj => `<div>
        <strong>${msj.name}</strong>
        <em>${msj.chat}</em>
        </div>` )
        .join('<br>')
    document.querySelector('p').innerHTML = mensajesHTML
})