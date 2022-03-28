var express = require("express");
var router = express.Router();
const path = require("path");

/* GET home page. */
router.get("/", function (req, res, next) {
	res.render("login");
});

//LOGIN
// exports.logIn = function (db) {
// 	return function (req, res) {
// 		var nombrev = req.body.nombre;
// 		var passv = req.body.pass;

// 		var collection = db.get("Jugadores");

// 		// desen a la BD
// 		collection.find(
// 			{
// 				nombre: nombrev,
// 				pass: passv,
// 			},
// 			function (err, doc) {
// 				if (err) {
// 					res.send("problemes amb la base de dades.");
// 				} else {
// 					//canviem URL al navegador
// 					res.location(path.join(__dirname, "../public", "juego.html"));
// 					//redireccionem
// 					res.redirect(path.join(__dirname, "../public", "juego.html"));
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
