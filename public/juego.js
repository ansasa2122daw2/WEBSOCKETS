const socket = io("http://localhost:4000");
let readyplayer1 = false;
let readyplayer2 = false;

socket.on("connect", (socket) => {
	console.log(`Client connected [id=${socket}]`);
});

socket.on("message", (message) => {
	console.log(message);
});

window.onload = function () {
	//
	//document.getElementById("ReadyPlayer2").style.disabled = true;
	//Timer
	let n = 0;
	let l = document.getElementById("contador");

	document.getElementById("ReadyPlayer1").addEventListener("click", () => {
		readyplayer1 = true;
		socket.emit("player1", readyplayer1);
		document.getElementById("ReadyPlayer1").style.backgroundColor = "red";
		document.getElementById("ReadyPlayer1").disabled = true;
		document.getElementById("ReadyPlayer1").style.cursor = "auto";
		iniciarContador();
	});
	document.getElementById("ReadyPlayer2").addEventListener("click", () => {
		readyplayer2 = true;
		socket.emit("player2", readyplayer2);
		document.getElementById("ReadyPlayer2").style.backgroundColor = "red";
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
