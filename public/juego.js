const socket = io("http://localhost:4000");
let readyplayer1 = false;
let readyplayer2 = false;
let botonClicked = false;

socket.on("connect", (socket) => {
	console.log(`Client connected [id=${socket}]`);
});

socket.on("message", (message) => {
	console.log(message);
});
let miBoton = "fdsdsfasf";
let miIntervalo;
window.onload = function () {
	//Timer
	let n = 0;
	let l = document.getElementById("contador");
	miIntervalo = setInterval(() => {
		console.log("fsdfs");
		refrescarBotones();
	}, 500);

	document.getElementById("ReadyPlayer1").addEventListener("click", (ev) => {
		readyplayer1 = true;
		botonClicked = true;
		socket.emit("player1", readyplayer1);
		miBoton = ev.target.id;
		let init = { method: "POST", body: JSON.stringify({ botonClicked: ev.target.id }) };
		fetch("http://localhost:4000/botonClicked", init).then((res) => {
			console.log(res);
		});
		document.getElementById("ReadyPlayer1").style.backgroundColor = "grey";
		document.getElementById("ReadyPlayer1").disabled = true;
		document.getElementById("ReadyPlayer1").style.cursor = "auto";

		let boton1 = document.getElementById("ReadyPlayer1");

		socket.emit("boton1", {
			color: boton1.style.backgroundColor,
			disabled: boton1.disabled,
			cursor: boton1.style.cursor,
		});

		socket.on("boton1", (data) => {
			boton1 = data;
			console.log("hola???");
		});

		iniciarContador();
	});
	document.getElementById("ReadyPlayer2").addEventListener("click", () => {
		readyplayer2 = true;
		botonClicked = true;
		socket.emit("player2", readyplayer2);

		document.getElementById("ReadyPlayer2").style.backgroundColor = "grey";
		document.getElementById("ReadyPlayer2").disabled = true;
		document.getElementById("ReadyPlayer2").style.cursor = "auto";
		iniciarContador();
	});
	function iniciarContador() {
		if (readyplayer1 === true && readyplayer2 === true) {
			setInterval(function () {
				l.innerHTML = n;
				n++;
			}, 1000);
			//readyplayer1
			document.getElementById("tabla").addEventListener("click", (e) => {
				document.getElementById(e.target.id).style.backgroundColor = "red";
			});
			//readyplayer2
			document.getElementById("tabla").addEventListener("click", (e) => {
				document.getElementById(e.target.id).style.backgroundColor = "blue";
				let player2 = document.getElementById(e.target.id);
				socket.emit("color", player2.style.backgroundColor);
			});
		}
	}

	function addTable() {
		let myTableDiv = document.getElementById("tabla");

		let table = document.createElement("TABLE");
		table.border = "1";

		let tableBody = document.createElement("TBODY");
		table.appendChild(tableBody);

		for (let i = 0; i < 6; i++) {
			let tr = document.createElement("TR");
			tableBody.appendChild(tr);

			for (let j = 0; j < 6; j++) {
				let td = document.createElement("TD");
				td.id = "TD" + i + j;
				td.width = "60";
				td.height = "60";
				tr.appendChild(td);
			}
		}
		myTableDiv.appendChild(table);
	}
	addTable();
};

function refrescarBotones() {
	let init = { method: "POST", body: JSON.stringify({ botonClicked }) };
	fetch("http://localhost:4000/preguntarBoton", init)
		.then((res) => {
			console.log("fsfs");
			return res.text();
		})
		.then((respuesta) => {
			console.log("sfasfa-->" + respuesta);
			console.log(miBoton);
			if (respuesta != miBoton && respuesta != "") {
				console.log("fsd");
				clearInterval(miIntervalo);
				document.getElementById(respuesta).style.backgroundColor = "grey";
				document.getElementById(respuesta).disabled = true;
				document.getElementById(respuesta).style.cursor = "auto";
			}
		});
}
