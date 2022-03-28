const socket = io.connect()


function addMessage(e) {
    const mensaje = {
        email: document.getElementById('email').value,
        username: document.getElementById('username').value,
        lastname: document.getElementById('lastname').value,
        edad: document.getElementById('edad').value,
        alias: document.getElementById('alias').value,
        text: document.getElementById('text').value
    };
    socket.emit('new-message', mensaje);
    return false;
}




socket.on('mensajes', msjs => {
    
  
    const mensajesHTML = msjs
        .map(msj => `<div>
        <strong>${msj.email}</strong>
        <em>${msj.username}</em>
        <em>${msj.lastname}</em>
        <em>${msj.edad}</em>
        <em>${msj.alias}</em>
        <em>${msj.text}</em>
        </div>` )
        .join('<br>')
    document.querySelector('p').innerHTML = mensajesHTML
})

