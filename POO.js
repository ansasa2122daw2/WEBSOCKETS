class Jugador {
	constructor(identificador, nombre, pass, puntuacion, tiempo) {
		this.identificador = identificador;
		this.nombre = nombre;
		this.pass = pass;
		this.puntuacion = puntuacion;
		this.tiempo = tiempo;
		this.ready = false;
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
	constructor(id, Jugador1, Jugador2, espectadores) {
		this.id = id;
		this.Jugador1 = Jugador1;
		this.Jugador2 = Jugador2;
		this.espectadores = espectadores;
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

(module.exports = Jugador), Partida;
