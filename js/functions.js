var click = 0; //contador de clicks
var numeroCarta; //numero de carta del primer click
var numPosPrimClick; //numero de posicion de la carta del primer click
var intentos = 0; //numero de intentos de hacer parejas
var parejasTotales; //numero de parejas totales que se pueden hacer
var parejasEncontradas = 0; //numero de parejas encontradas
var timeShowCard = 0; //tiempo que tardan las cartas en darse la vuelta cuando el usuario falla
var win = 0; //saber si a ganado
var ayudas = 3;
var arrayEncontradas = [];
var tamCarta = "carta4";
var card = 0;
var segundos = 1;
var contador = null;
//funcion para reiniciar la partida
frontDispay();
function reset() {
    click = 0;
    intentos = 0;
    parejasEncontradas = 0;
    win = 0;
    ayudas = 3;
    pintarDatosTabla();
    clearInterval(contador);
    document.getElementById("mensaje").innerHTML = "Suerte, la vas a necesitar!";
    document.getElementById("tiempo").innerHTML = "0";
    document.getElementById("ayuda").removeAttribute("onclick");
    document.getElementById("buttonSubmit").setAttribute("src","img/table.png");
    document.getElementById("btn-start").setAttribute("class","module");
    display();
    for(var i = 0; 0<parejasTotales*2;i++){
        document.getElementById("check"+i+"").checked = false;
    }
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
    document.getElementById("ayudas").innerHTML = ""+ayudas;
}

//funcion para volver a poner las cartas del reves cuando el usuario galla
function darVueltaCartas(numPos) {
    borrarBorde();
    document.getElementById("check"+numPosPrimClick+"").checked = false;
    document.getElementById("check"+numPos+"").checked = false;
    click=0;

}

//funcion que pinta un mensaje cuando el usuario hace una pareja
function pintarAcierto() {
    setTimeout(sAcierto,320);
    document.getElementById("mensaje").innerHTML = "Has echo una pareja!";
}

//funcion que pinta un mensaje cuando el usuario se ha equivocado
function pintarFallo() {
    setTimeout(sError,320);
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
        setTimeout(sWin,320);
        document.getElementById("mensaje").innerHTML = "Lo has conseguido!!! Felicidades! Has necesitado " + intentos + " intentos y " + segundos + "segundos.";
        document.getElementById("buttonSubmit").setAttribute("src","img/save.png");
        win++;
        pauseTime();
    }
}

//funcion que controla cuando el usuario interactua con la carta cuando no ve su valor
function controlCheckFront(numCarta, numPos) {
    click++;
    if(click==1){
        // aqui entra en el 1r click
        sFirstClick();
        numeroCarta = numCarta;
        numPosPrimClick = numPos;
        document.getElementById(numPosPrimClick+"").setAttribute("class","none-display "+tamCarta);
        document.getElementById("ayuda").removeAttribute("onclick");
    }

    else if(click==2){
        // 2o click
        numPosSegClick = numPos;
        document.getElementById(numPos+"").setAttribute("class","carta none-display");
        sSecondClick();
        if(checkPar(numCarta)== true){
            pintarAcierto();
            borderAcierto(numPos);
            parejasEncontradas++;
            click=0;
        }
        else if (checkPar(numCarta)== false){
            pintarFallo();
            borderFallo(numPos);
            setTimeout(darVueltaCartas,timeShowCard*1000,numPos);
        }
        setTimeout(borrarBorde,timeShowCard*900,numPos);
        intentos++;
        pintarDatosTabla();
        controlParejas();
        frontDispay();
        document.getElementById("ayuda").setAttribute("onclick","mostrarCartas()");
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
    document.getElementById("filas").setAttribute('value',fil);
    document.getElementById("columnas").setAttribute('value',col);
    document.getElementById("int").setAttribute('value',intentos);
    if(win==1)document.getElementById("ganadas").setAttribute('value','1');
    document.getElementById("segundos").setAttribute('value',segundos);
    abrirPag();
}

//funcion para hacer click en el boton  enviar los valores al servidor para guardar la puntuacion
function abrirPag() {
    document.getElementById("submitPunt").click();
}

function sFirstClick() {
    document.getElementById("first-click").play();
}

function sSecondClick() {
    document.getElementById("second-click").play();
}

function sError() {
    document.getElementById("error").play();
}

function sAcierto() {
    document.getElementById("acierto").play();
}

function sWin() {
    document.getElementById("win").play();
}

function borderAcierto(numPos) {
    document.getElementById("0"+numPosPrimClick).setAttribute("class","border-acierto "+tamCarta);
    document.getElementById("0"+numPos).setAttribute("class","border-acierto "+tamCarta);
}

function borderFallo(numPos) {
    document.getElementById("0"+numPosPrimClick).setAttribute("class","border-fallo "+tamCarta);
    document.getElementById("0"+numPos).setAttribute("class","border-fallo "+tamCarta);
}

function borrarBorde(numPos) {
    for(var i = 0; i < parejasTotales * 2; i++){
        document.getElementById("0"+i).setAttribute("class","border "+tamCarta);
    }
}

function mostrarCartas() {
    ayudas--;
    document.getElementById("ayuda").removeAttribute("onclick");
    document.getElementById("pause").removeAttribute("onclick");
    document.getElementById("ayuda").disabled = true;
    if(ayudas>=0){
        for(var i = 0; i < parejasTotales*2;i++){
            if(document.getElementById("check"+i+"").checked == true){
                arrayEncontradas.push(i);
            }
            else{
                document.getElementById("check"+i+"").checked = true;
            }
        }
        setTimeout(ocultarCartas,3000);
    }
}

function ocultarCartas() {
    document.getElementById("ayuda").setAttribute("onclick","mostrarCartas()");
    document.getElementById("pause").setAttribute("onclick","pauseTime()");
    for(var i = 0; i < parejasTotales*2;i++){
        document.getElementById("check"+i+"").checked = false;
    }
    for(var i = 0; i < parejasTotales*2;i++){
        for(var j = 0; j < arrayEncontradas.length;j++){
            if(arrayEncontradas[j]==i){
                document.getElementById("check"+i+"").checked = true;
            }
        }
    }
    intentos +=5;
    if(ayudas<3){
        document.getElementById("ayuda").disabled = false;
    }
    pintarDatosTabla();
}

function soundMuted() {
    document.getElementById("btnVolum").setAttribute("src","img/speakerMuted.png");
    document.getElementById("btnVolum").setAttribute("onclick","soundOn()");
    document.getElementById("first-click").muted = true;
    document.getElementById("second-click").muted = true;
    document.getElementById("acierto").muted = true;
    document.getElementById("error").muted = true;
    document.getElementById("win").muted = true;
}

function soundOn() {
    document.getElementById("btnVolum").setAttribute("src","img/speakerOn.png");
    document.getElementById("btnVolum").setAttribute("onclick","soundMuted()");
    document.getElementById("first-click").muted = false;
    document.getElementById("second-click").muted = false;
    document.getElementById("acierto").muted = false;
    document.getElementById("error").muted = false;
    document.getElementById("win").muted = false;
}

function frontDispay() {
    for(var i = 0; i < parejasTotales * 2; i++){
        document.getElementById(""+i).setAttribute("class","border "+tamCarta);
    }
}

function display(){
    for(var i = 0; i < parejasTotales * 2; i++){
        document.getElementById(i+"").setAttribute("class","border "+tamCarta);
        document.getElementById("0"+i).setAttribute("class","border "+tamCarta);
    }
}

function tamCard(tam) {
    tamCarta = "carta"+tam;
    card = tam;
}
function cambiarTamCartas() {

    for(var i = 0; i < parejasTotales * 2; i++){
        document.getElementById("tamCarta"+i).setAttribute("class","card"+card);
    }
    display();
}

function startTime() {
    document.getElementById("ayuda").setAttribute("onclick","mostrarCartas()");
    document.getElementById("pause").setAttribute("onclick","pauseTime()");
    document.getElementById("btn-start").setAttribute("class","none-display");
    segundos = segundos++;
    contador = setInterval(function(){
        document.getElementById("tiempo").innerHTML = segundos;
        segundos++;
    },1000);
}

function pauseTime() {
    document.getElementById("ayuda").removeAttribute("onclick");
    document.getElementById("btn-start").setAttribute("class","module");
    document.getElementById("pause").removeAttribute("onclick");
    clearInterval(contador);
}
