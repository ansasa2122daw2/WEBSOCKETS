window.onload = () => {

    let ws = io();
    let tabla = document.getElementById("tablaPartida");
    let intervalStart= false;
    let tableroLleno = false;
    let ganador = "";

    let socketID = Math.random() * (100000)

    ws.emit("conexionGame", {jugador: socketID});

    ws.on("conexionGame", data => { //Recibe los mensajes del servidor
       
        tabla.addEventListener('click', (e) => {
            intervalStart = true;
            if(tableroLleno == false){
                if(e.target.style.backgroundColor != 'red' || e.target.style.backgroundColor != 'green'){
                    if(data.jugadores[0].id == socketID){
                        e.target.style.backgroundColor = data.jugadores[0].color;
                        ws.emit("tableroCambiado", { IDcelda: e.target.id, colorCelda: data.jugadores[0].color, intervalStart:intervalStart })
                        console.log("rojo")
                    }else{
                        if(data.jugadores[1].id == socketID){
                            e.target.style.backgroundColor = data.jugadores[1].color;
                            ws.emit("tableroCambiado", { IDcelda: e.target.id, colorCelda: data.jugadores[1].color, intervalStart:intervalStart })
                            console.log("verde")
                        }
                    }
                }
            }
            else{
                console.log("hay ganador")
                if(ganador == 1){
                    alert("Ha ganado el Jugador 1 ");
                    
                }else{
                    alert("Ha ganado el Jugador 2 ");
                }
                /*window.location.href = "http://localhost:3000/menu";
                ws.emit("acabarGame");
                
                INTENTO DE REINCIO DE PARTIDA
                */
            }
        });
    });

    ws.on("tableroCambiado", data => {

        tableroLleno = data.tableroLleno;
        ganador = data.ganador;

        document.getElementById("timer").innerHTML = data.contador;
        document.getElementById("puntuacionRojo").innerHTML = data.puntuacionRojo;
        document.getElementById("puntuacionVerde").innerHTML = data.puntuacionVerde;

        for(let i = 0; i < data.tablero.length; i++){
            if(data.tablero[i] == 1){
                console.log(i)
                document.getElementById(i).style.backgroundColor = "red" 
                
            }else{
                if(data.tablero[i] == 2){
                    document.getElementById(i).style.backgroundColor = "green"
                }
            }
        }
    });

}