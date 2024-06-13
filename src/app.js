import express from "express";
import exphbs from "express-handlebars";
import {Server} from "socket.io";


const app = express();
const port = 8080

//midleware
app.use(express.static("./src/public"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//configurar hbs

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "src/views")

//rutas

app.get("/", (req,res) =>{
    res.render("index");
})


//listen esuchamos
const httpserver = app.listen(port, () =>{
    console.log(`escuchando n el servidor 8080${port}`);
})



//websockets: 
//1) me guardo una referencia del servidor
//2) generamos una instanbcia desde el lado de back

const io = new Server(httpserver);

//generamos un array donde guardaremos los mensajes
let mensajes= []

io.on("connection", (socket) => {
    console.log("un cliente se conecto")
    socket.on("mensaje",(data)=>{
        mensajes.push(data);
        //aca estoy guardando la informacion que me manda el cliente (user+mensaje) y lo pusheo al array
        //emitimos mensaje y clientes con todo lo del array de datos
        socket.emit("mensajeslogs", mensajes);
    });
})

