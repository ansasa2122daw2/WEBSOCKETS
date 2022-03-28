var express = require("express");
var path = require("path");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");

var loginController = require("./controllers/index");

var app = express();

//MOGODB
// var MongoClient = require("mongodb").MongoClient;
// MongoClient.connect("mongodb://localhost:27017", function (err, db) {
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

// app.get("/login", loginController.logIn());

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
