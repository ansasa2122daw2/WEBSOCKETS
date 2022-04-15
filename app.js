var express = require("express");
var http = require("http");
var path = require("path");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");

var loginController = require("./controllers/index");

var app = express();
var server = http.createServer(app);
server.listen("4000");
var io = require("socket.io")(server);

let botonJugador = "";

//EXPRESS BOTONES

// server.post("/botonClicked", (req, res) => {
// 	console.log("fsdfs");
// 	botonJugador = JSON.parse(req).botonClicked;
// 	console.log("--->" + botonJugador);
// 	res.end();
// });

// app.post("/preguntarBoton", (req, res) => {
// 	res.end(botonJugador);
// });

// WEBSOCKETS
io.on("connect", (socket) => {
	console.log(`Client connected [id=${socket.id}]`);
	socket.emit("message", "holi");

	//broadcast when a user connects
	socket.broadcast.emit("message", "A user joined");

	socket.on("disconnect", () => {
		io.emit("message", "User left");
	});

	//player 1 clicando boton
	socket.on("player1", (readyplayer1) => {
		console.log(readyplayer1);
	});

	//player 2 clicando boton
	socket.on("player2", (readyplayer2) => {
		console.log(readyplayer2);
	});

	socket.on("boton1", (data) => {
		console.log(data);
		console.log("funciona?");
		socket.broadcast.emit(data);
	});

	socket.on("color", (data) => {
		console.log(data);
		console.log("buenas");
	});
});

//MOGODB
var MongoClient = require("mongodb").MongoClient;

// var db = MongoClient.connect("mongodb://localhost:27017", function (err, db) {
// 	if (err) {
// 		throw err;
// 	}
// 	let database = db.db("websockets");
// 	database
// 		.collection("Jugadores")
// 		.find()
// 		.toArray(function (err, result) {
// 			if (err) {
// 				throw err;
// 			}
// 			console.log(result);
// 		});
// });

app.post("/login", loginController.logIn(db));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", loginController);

app.use(function (req, res, next) {
	var err = new Error("Not Found");
	err.status = 404;
	next(err);
});

if (app.get("env") === "development") {
	app.use(function (err, req, res, next) {
		res.status(err.status || 500);
		res.render("error", {
			message: err.message,
			error: err,
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
	res.status(err.status || 500);
	res.render("error", {
		message: err.message,
		error: {},
	});
});

module.exports = app;
