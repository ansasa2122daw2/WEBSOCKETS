var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
	res.render("login", { titol: "Express 4.0" });
});

router.get("/sala", function (req, res, next) {
	res.render("sala");
});

module.exports = router;
