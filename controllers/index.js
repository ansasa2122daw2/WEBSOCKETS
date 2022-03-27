var express = require("express");
var router = express.Router();
const path = require("path");

/* GET home page. */
router.get("/", function (req, res, next) {
	res.render("login", { titol: "Express 4.0" });
});

router.get("/juego", function (req, res, next) {
	//res.send(__dirname);
	res.sendFile(path.join(__dirname, "../public", "juego.html"));
});

module.exports = router;
