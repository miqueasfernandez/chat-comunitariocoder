

const socket = io()
//generamos uina instancia de socket.io del lado del cliente

let user;

const chatBox = document.getElementById("chatBox");

//utilizamos sweetalert2 para generar un ms de bienvenida

//swal es un objeto global de sweetalert y para configurar cada alerta usabamos el metodo fire

Swal.fire({
    title: "Identificate",
    input: "text", 
    text: "Ingresa un user para identificarte en el Chat", 
    inputValidator: (value) => {
        return !value && "Necesitas escribir un nombre para continuar";
    }, 
    allowOutsideClick: false
}).then( result => {
    user = result.value
})

chatBox.addEventListener("keyup", (event) => {
    if(event.key === "Enter") {
        if(chatBox.value.trim().length > 0) {
            //Trim nos permite sacar los espacios en blanco del principio y el final de un string. Si el mensaje tiene mas de 0 caracteres, lo enviamos al servidor. 
            socket.emit("mensaje", {user: user, mensaje: chatBox.value})
            chatBox.value = "";
        }
    }
})

//listener de mensajes

socket.on("mensajesLogs", (data) => {
    const messagesLogs = document.getElementById("messagesLogs");
    let mensajes = "";
    data.forEach(mensaje => {
        mensajes += `
                    <div class ="message">
                        <span class = "user" > ${mensaje.user} </span>
                        <div class = "text" > ${mensaje.mensaje} </div>
                    </div> `
    })
    messagesLogs.innerHTML = mensajes;
})