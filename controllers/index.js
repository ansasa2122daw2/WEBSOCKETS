var express = require("express");
var router = express.Router();
const path = require("path");

/* GET home page. */
router.get("/", function (req, res, next) {
	res.render("login");
});

// router.logIn = function (db) {
// 	return function (req, res) {
// 		let nombre = req.body.nombre;
// 		let pass = req.body.pass;
// 		console.log(db);
// 		// var collection = db.get("Jugadores");
// 		// console.log("hola" + collection);
// 		// //desen a la BD
// 		db.find(
// 			{
// 				nombre: nombre,
// 			},
// 			function (err, doc) {
// 				if (err) {
// 					res.send("problemes amb la base de dades.");
// 				}
// 				if (!doc) {
// 					res.send("No existe este usuario");
// 				}
// 				if (doc.pass !== pass) {
// 					res.send("Contraseña o usuario incorrecto");
// 				} else {
// 					return res.sendFile(path.join(__dirname, "../public", "juego.html"));
// 				}
// 			}
// 		);
// 	};
// };

router.get("/juego", function (req, res, next) {
	//res.send(__dirname);
	res.sendFile(path.join(__dirname, "../public", "juego.html"));
});

module.exports = router;
