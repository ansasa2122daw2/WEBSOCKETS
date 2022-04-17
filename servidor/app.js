const express = require('express');
const http = require('http');
const path = require('path');
let MongoClient = require('mongodb').MongoClient;
let url = "mongodb://localhost:27017/";
const { Server } = require("socket.io");
const { Partida, Jugador } = require("./POO");

const app = express();
const server = http.createServer(app);
const io = new Server(server);
let arrayPartides = new Array(2);

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
app.get("/stats", (req, res) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("WebSocketss");
        dbo.collection("Games").find({}).toArray(function (err, partides) {
            if (err) throw err;
            console.log(partides);
            db.close();
            res.render("stats",{partides:partides})
        });
    });
});

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
    let id = req.body.id;
    let jugador = req.body.nombre;
    let partida;
    arrayPartides.push( partida => new Partida(id, jugador));
    //console.log(id);
    if (arrayPartides.length == 0) {
        res.render("menu");
        console.log("error");
    } else {
        res.render("game", { codiPartida: id, nombre: jugador });
        console.log("Entrando a una partida");
        console.log(arrayPartides);
    }
});


server.listen(3000, () => console.log("Iniciant Servidor al port 3000"));