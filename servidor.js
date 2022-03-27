const express = require("express");
let app = express();
let port = 8888;

const io = require("socket.io").listen(app.listen(port));
console.log("Listening on port " + port);

io.sockets.on("connection", function (socket) {
	socket.emit("missatge", { missatge: "Benvingut" });
	socket.on("enviar", function (data) {
		io.sockets.emit("missatge", data);
	});
});
