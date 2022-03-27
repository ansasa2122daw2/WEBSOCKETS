const socket = io();

window.onload = function () {
	let readyplayer1 = false;
	let readyplayer2 = false;
	//Timer
	let n = 0;
	let l = document.getElementById("contador");
	document.getElementById("ReadyPlayer1").addEventListener("click", () => {
		readyplayer1 = true;
		iniciarContador();
	});
	document.getElementById("ReadyPlayer2").addEventListener("click", () => {
		readyplayer2 = true;
		iniciarContador();
	});
	function iniciarContador() {
		if (readyplayer1 === true && readyplayer2 === true) {
			setInterval(function () {
				l.innerHTML = n;
				n++;
			}, 1000);
			document.getElementById("tabla").addEventListener("click", (e) => {
				document.getElementById(e.target.id).style.backgroundColor = "red";
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
