const express = require('express');
const http = require('http');
const path = require('path');
let MongoClient = require('mongodb').MongoClient;
let url = "mongodb://localhost:27017/";
const { Server } = require("socket.io");
const { Partida, Jugador } = require("./POO");

const app = express();
const server = http.createServer(app);
const wss = new Server(server);
let arrayPartides = [];

app.use(express.static(path.join(__dirname, "../public/css")));
app.use(express.static(path.join(__dirname, "../public/imgs")));
app.use(express.static(path.join(__dirname, "../public/js")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('views', path.join(__dirname, "../public/views"));
app.set("view engine", "pug");

app.get("/dashboard", (req, res) => res.render("dashboard"));
app.get("/game", (req, res) => res.render("game"));
app.get("/menu", (req, res) => res.render("menu"));
app.get("/login", (req, res) => res.render("login"));

//login
app.post("/loginMongo", (req, res) => {
    let nombre = req.body.nombre;
    let password = req.body.password;
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("WebSocketss");
        dbo.collection("Usuaris").find({}).toArray(function (err, result) {
            if (err) throw err;
            //console.log(result);
            let usuaris = result;
            let usuari = usuaris.find((usuari) => {
                return usuari.nombre == nombre && usuari.password == password;
            });
            if (usuari != undefined) {
                res.render("menu", { nombre: usuari.nombre });
                console.log("Entrando al menu")
            } else {
                res.render("login", { error: true });
                console.log("Error")
            }
            db.close();
        });
    });
});

//Entrar a una partida
app.post("/entrarPartida", (req, res) => {
    let id = req.body.id ;
    let nombre = req.body.nom;
    console.log(arrayPartides[0])
    if(!arrayPartides[0]){
        arrayPartides.push( partida => new Partida(id, jugador));
        if(arrayPartides[0].Jugador){
            console.log(arrayPartides[0])
        }
    }else{
        arrayPartides.push( partida => new Partida(id, jugador));
    }

    if (arrayPartides.length == 0) {
        res.render("menu");
    } else {
        res.render("game", { codiPartida: id, nombre: nombre });
        console.log("Entrando a una partida");
        console.log(arrayPartides);
    }
});

//VER PUNTUACIONES
app.get("/puntuaciones", (req, res) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("WebSocketss");
        dbo.collection("Partides").find({}).toArray(function (err, partides) {
            if (err) throw err;
            console.log(partides);
            db.close();
            res.render("puntuaciones",{partides:partides})
        });
    });
});

//websockets

//Todos los jugadores
let jugadores = [];
let espectadores = [];
let jugador;
let jugador2;
let espectador;
let tablero = new Array(35).fill(0);
let puntuacionRojo = 0;
let puntuacionVerde = 0;
let contador = 0;
let interval = 0;
let tableroLleno = false;
let ganador = 0;


wss.on("connection", socket => {

    socket.on("open", () => console.log("Jugador conectado", socket.id));//Jugador conectado
    socket.on("close", () => console.log("Jugador desconectado"));//Jugador desconectado

    socket.on("conexionGame", data => {//Recibe los mensajes del cliente
        
        if(jugador == undefined){
            jugador = { id: data.jugador, color: "red" }
            jugadores.push(jugador);
            console.log(jugadores)
        }else{
            if(jugador2 == undefined){
                jugador2 = { id: data.jugador, color: "green" }
                jugadores.push(jugador2);
                console.log(jugadores)
            }
            else{
                espectador = { id: data.jugador }
                espectadores.push(espectador)
            }
        }
        socket.emit("conexionGame", {jugadores: jugadores, espectadores: espectadores, tablero:tablero});//Envia mensaje a los clientes
    })

    socket.on("tableroCambiado", data =>{
        console.log("chekiando el tablero servidor")
            
            if(tablero.indexOf(0) == -1){
                tableroLleno = true;
                if(tableroLleno){
                    if(puntuacionRojo > puntuacionVerde){
                        console.log("ha ganao el rojo")
                        ganador = 1
                        guardarGanador(ganador, contador)
                    }
                    else {
                        console.log("ha ganao el verde")
                        ganador = 2
                        guardarGanador(ganador, contador)
                    }
                }
            }

        let intervalStart = data.intervalStart

        if(tablero[data.IDcelda] == 0){
            if(data.colorCelda == "red"){
                tablero[data.IDcelda] = 1;
                puntuacionRojo++
            }else{
                tablero[data.IDcelda] = 2;
                puntuacionVerde++;
            }
        }
        if(intervalStart){
            interval++;
            if(interval = 1){
                setInterval(() => {
                    contador++;
                }, 1000);
            }
        }
        console.log(tablero);
        socket.broadcast.emit("tableroCambiado", {tablero: tablero, puntuacionRojo: puntuacionRojo, puntuacionVerde: puntuacionVerde, contador:contador ,tableroLleno:tableroLleno, ganador: ganador});
    })

    socket.on("acabarGame", () =>{
        jugadores = [];
        espectadores = [];
        jugador = undefined;
        jugador2 = undefined;
        espectador = undefined;
        tablero = new Array(35).fill(0);
        puntuacionRojo = 0;
        puntuacionVerde = 0;
        contador = 0;
        interval = 0;
        tableroLleno = false;
        ganador = 0
    })

});

function guardarGanador(ganador, contador){
    let jugadorGanador;
    let jugadorPerdedor;
    let contadorPasar = contador;
    if(ganador == 1){
        jugadorGanador = "Arnau"
        jugadorPerdedor = "Andrea"
    }else{
        jugadorGanador = "Andrea"
        jugadorPerdedor = "Arnau"
    }

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("WebSocketss");

        let partida = { Guanyador: jugadorGanador, Perdedor: jugadorPerdedor, temps: contadorPasar}

        dbo.collection("Partides").insertOne(partida, function (err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            db.close();
        });
    });
}

server.listen(3000, () => console.log("Iniciant Servidor al port 3000"));