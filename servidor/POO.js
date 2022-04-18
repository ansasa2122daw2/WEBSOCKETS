class Jugador {
	color;
	constructor(identificador) {
		this.identificador = identificador;
	}

	getNombre() {
		return this.nombre;
	}

	getPass() {
		return this.pass;
	}

	getPuntuacion() {
		return this.puntuacion;
	}

	getTiempo() {
		return this.tiempo;
	}

	añadirPuntuacion(puntuacion, tiempo, resultado1, resultado2) {
		puntuacion.push(resultado1);
		tiempo.push(resultado2);
	}
}

class Partida {

	jugadores = [];
	espectadores = [];

	constructor(id, jugador){
		this.id = id;
		this.jugadores.push(jugador);
	}

	getId() {
		return this.id;
	}

	getJugador1() {
		return this.Jugador1;
	}

	getJugador2() {
		return this.Jugador2;
	}

	getEspectadores() {
		return this.espectadores;
	}

	setId(id) {
		this.id = id;
	}

	setJugador1(Jugador1) {
		this.Jugador1 = Jugador1;
	}

	setJugador2(Jugador2) {
		this.Jugador2 = Jugador2;
	}

	setEspectadores(espectadores, espectador) {
		espectadores.push(espectador);
	}
}

(module.exports = Partida), Jugador;
