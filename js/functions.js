var click = 0; //contador de clicks
var numeroCarta; //numero de carta del primer click
var numPosPrimClick; //numero de posicion de la carta del primer click
var intentos = 0; //numero de intentos de hacer parejas
var parejasTotales; //numero de parejas totales que se pueden hacer
var parejasEncontradas = 0; //numero de parejas encontradas
var timeShowCard = 0; //tiempo que tardan las cartas en darse la vuelta cuando el usuario falla

//funcion para reiniciar la partida
function reset() {
    click = 0;
    intentos = 0;
    parejasEncontradas = 0;
    pintarDatosTabla();
    document.getElementById("mensaje").innerHTML = "Suerte, la vas a necesitar";
    document.getElementById("buttonSubmit").disabled = true;
    for(var i = 0; 0<parejasTotales*2;i++){
        document.getElementById("check"+i+"").checked = false;
    }

}


function llamarGuardar() {
    return guardarPuntuacion();
}

//funcion llamada desde functions.php para pasar los valores de timeShowCard y parejasTotales que ha elegido el usuario
function pasarVar(cantidadParejas, tiempoMostrarCarta) {
    parejasTotales = cantidadParejas;
    timeShowCard = tiempoMostrarCarta;
}

//funcion que pinta los intentos y parejas actuales
function pintarDatosTabla(){
    document.getElementById("intentos").innerHTML = ""+intentos;
    document.getElementById("parejas").innerHTML = ""+parejasEncontradas;
}

//funcion para volver a poner las cartas del reves cuando el usuario galla
function darVueltaCartas(numPos) {
    document.getElementById("check"+numPosPrimClick+"").checked = false;
    document.getElementById("check"+numPos+"").checked = false;
    click=0;

}

//funcion que pinta un mensaje cuando el usuario hace una pareja
function pintarAcierto() {
    document.getElementById("mensaje").innerHTML = "Has echo una pareja!";
}

//funcion que pinta un mensaje cuando el usuario se ha equivocado
function pintarFallo() {
    document.getElementById("mensaje").innerHTML = "Te has equivocado!";
}

//funcion para comprobar si las cartas que ha girado el usuario son iguales o no
function checkPar(numCarta) {
    if(numCarta===numeroCarta){
        return true;
    }
    else return false;
}


function cogerIntentos() {
    return ""+intentos;
}

//funcion que controla cuando el usuario ha encontrado todas las parejas posibles y pinta un mensaje para felicitarle.
function controlParejas() {
    if(parejasTotales==parejasEncontradas){
        document.getElementById("mensaje").innerHTML = "Lo has conseguido!!! Felicidades! Has necesitado " + intentos + " intentos.";
        document.getElementById("buttonSubmit").disabled = false;
    }
}

//funcion que controla cuando el usuario interactua con la carta cuando no ve su valor
function controlCheckFront(numCarta, numPos) {
    click++;
    if(click==1){
        // aqui entra en el 1r click
        numeroCarta = numCarta;
        numPosPrimClick = numPos;
    }

    else if(click==2){
        // 2o click
        if(checkPar(numCarta)== true){
            pintarAcierto();
            parejasEncontradas++;
            click=0;
        }
        else if (checkPar(numCarta)== false){
            pintarFallo();
            setTimeout(darVueltaCartas,timeShowCard*1000,numPos);
        }
        intentos++;
        pintarDatosTabla();
        controlParejas();
    }
    //entra cuando el usuario intenta clicar en mas cartas seguidamente sin dar tiempo a que la animacion de darse la vuelta
    //haya transcurrido para evitar errores
    else {
        document.getElementById("check"+numPos+"").checked = true;

    }
}

//funcion para controlar que cuando el usuario ha acertado la pareja no pueda dar la vuelta a esas cartas otra vez
function controlCheckBack(numCarta) {
    document.getElementById("check"+numCarta+"").checked = false;
}

//funcion para dar valor a los campos del formulario oculto y
function darValuesSubmit(nom, col, fil) {
    document.getElementById("nombre").setAttribute('value',nom);
    document.getElementById("fil").setAttribute('value',fil);
    document.getElementById("col").setAttribute('value',col);
    document.getElementById("int").setAttribute('value',intentos);
    abrirPag();
}

//funcion para hacer click en el boton  enviar los valores al servidor para guardar la puntuacion
function abrirPag() {
    document.getElementById("submitPunt").click();
}
