var click = 0; //contador de clicks
var numeroCarta; //numero de carta del primer click
var numPosPrimClick; //numero de posicion de la carta del primer click
var intentos = 0; //numero de intentos de hacer parejas
var parejasTotales; //numero de parejas totales que se pueden hacer
var parejasEncontradas = 0; //numero de parejas encontradas
var tiempoMostrarCarta = 0; //tiempo que tardan las cartas en darse la vuelta cuando el usuario falla
var win = 0; //saber si a ganado
var ayudas = 3; //cantidad de veces que podemos dar al boton de ayuda en la misma partida
var arrayEncontradas = []; //lista con las parejas encontradas (se utiliza para el boton de ayuda)
var tamCarta = "carta4"; //define el tamaño de la carta dependiendo de la eleccion del usuario
var card = 0; //numero del tamaño de la carta(se utiliza para definir estilos con el css)
var segundos = 1;//segundos para el cronometro
var minutos = 0;//minutos para el cronometro
var contador = null;//variable para saber si el cronometro esta en marxa o parado.

mostrarCaraCarta();

//funcion para reiniciar la partida
function reset() {
    clearInterval(contador);
    contador = null;
    click = 0;
    minutos = 0;
    segundos = 1;
    intentos = 0;
    parejasEncontradas = 0;
    win = 0;
    ayudas = 3;
    pintarDatosPartida();
    clearInterval(contador);
    document.getElementById("mensaje").innerHTML = "Suerte, la vas a necesitar!";
    document.getElementById("tiempo").innerHTML = "00:00";
    document.getElementById("ayudas").innerHTML = "3";
    document.getElementById("ayuda").removeAttribute("onclick");
    document.getElementById("buttonSubmit").setAttribute("src","img/table.png");
    document.getElementById("btn-start").setAttribute("class","module2");
    mostrarDetrasCartas();
    for(var i = 0; 0<parejasTotales*2;i++){
        document.getElementById("check"+i+"").checked = false;
    }
}

//funcion llamada desde functions.php para pasar los valores de tiempoMostrarCarta y parejasTotales que ha elegido el usuario
function pasarVar(cantidadParejas, tiemMostrarCarta) {
    parejasTotales = cantidadParejas;
    tiempoMostrarCarta = tiemMostrarCarta;
}

//funcion que pinta los intentos y parejas actuales
function pintarDatosPartida(){
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
    setTimeout(sonidoAcierto,320);
    document.getElementById("mensaje").innerHTML = "Has echo una pareja!";
}

//funcion que pinta un mensaje cuando el usuario se ha equivocado
function pintarFallo() {
    setTimeout(sonidoFallo,320);
    document.getElementById("mensaje").innerHTML = "Te has equivocado!";
}

//funcion para comprobar si las cartas que ha girado el usuario son iguales o no
function comprobarPareja(numCarta) {
    if(numCarta===numeroCarta){
        return true;
    }
    else return false;
}

//funcion que controla cuando el usuario ha encontrado todas las parejas posibles y pinta un mensaje para felicitarle.
function controlParejas() {
    if(parejasTotales==parejasEncontradas){
        setTimeout(sonidoVictoria,320);
        document.getElementById("mensaje").innerHTML = "Lo has conseguido!!! Felicidades! Has necesitado " + intentos + " intentos";
        win++;
        pausa();
        mostrarBotonGuardar();
        bloquearBotones();
    }
}

//funcion que controla cuando el usuario interactua con la carta cuando no ve su valor
function controlCheckFront(numCarta, numPos) {
    click++;
    if(click==1){
        // aqui entra en el 1r click
        sonidoPrimerClick();
        numeroCarta = numCarta;
        numPosPrimClick = numPos;
        document.getElementById(numPosPrimClick+"").setAttribute("class","none-display");
        document.getElementById("ayuda").removeAttribute("onclick");
    }

    else if(click==2){
        // 2o click
        numPosSegClick = numPos;
        document.getElementById(numPos+"").setAttribute("class","carta none-display");
        sonidoSegundoClick();
        if(comprobarPareja(numCarta)== true){
            pintarAcierto();
            borderAcierto(numPos);
            parejasEncontradas++;
            click=0;
        }
        else if (comprobarPareja(numCarta)== false){
            pintarFallo();
            borderFallo(numPos);
            setTimeout(darVueltaCartas,tiempoMostrarCarta*1000,numPos);
        }
        setTimeout(borrarBorde,tiempoMostrarCarta*900,numPos);
        intentos++;
        pintarDatosPartida();
        controlParejas();
        mostrarCaraCarta();
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

//funcion para dar valor a los campos del formulario oculto y enviarlos a la pagina de puntuacion.
function darValuesSubmit(nom, col, fil) {
    document.getElementById("nombre").setAttribute('value',nom);
    document.getElementById("filas").setAttribute('value',fil);
    document.getElementById("columnas").setAttribute('value',col);
    document.getElementById("int").setAttribute('value',intentos);
    document.getElementById("segundos").setAttribute('value',segundos);
    if(win==1){
        document.getElementById("ganadas").setAttribute('value','1');
    }
    while(minutos>0){
        minutos--;
        segundos+= 60;
    }
    document.getElementById("submitPunt").click();
}

//------sonidos Inicio
function desactivarSonido() {
    document.getElementById("btnVolum").setAttribute("src","img/speakerMuted.png");
    document.getElementById("btnVolum").setAttribute("onclick","activarSonido()");
    document.getElementById("first-click").muted = true;
    document.getElementById("second-click").muted = true;
    document.getElementById("acierto").muted = true;
    document.getElementById("error").muted = true;
    document.getElementById("win").muted = true;
}

function activarSonido() {
    document.getElementById("btnVolum").setAttribute("src","img/speakerOn.png");
    document.getElementById("btnVolum").setAttribute("onclick","desactivarSonido()");
    document.getElementById("first-click").muted = false;
    document.getElementById("second-click").muted = false;
    document.getElementById("acierto").muted = false;
    document.getElementById("error").muted = false;
    document.getElementById("win").muted = false;
}

function sonidoPrimerClick() {
    document.getElementById("first-click").play();
}

function sonidoSegundoClick() {
    document.getElementById("second-click").play();
}

function sonidoFallo() {
    document.getElementById("error").play();
}

function sonidoAcierto() {
    document.getElementById("acierto").play();
}

function sonidoVictoria() {
    document.getElementById("win").play();
}
//------sonidos FIN!!!

//pintar colores border y borrar Inicio
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
//pintar colores bordes FIN!!!

//se ejecuta cuando clicas sobre el boton de ayuda, almacena en una array la posicion de las parejas encontradas y le da la vuelta al resto
function mostrarCartas() {
    document.getElementById("ayuda").removeAttribute("onclick");
    document.getElementById("pause").removeAttribute("onclick");
    document.getElementById("ayuda").disabled = true;
    if(ayudas>0){
        ayudas--;
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

//se ejecuta cuando pasan 3 segundos despues de haber clicado el boton de ayuda
function ocultarCartas() {
    document.getElementById("ayuda").setAttribute("onclick","mostrarCartas()");
    document.getElementById("pause").setAttribute("onclick","pausa()");
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
    pintarDatosPartida();
}

//funciones para jugar con el display de las cartas estas dos las muestran
function mostrarCaraCarta() {
    for(var i = 0; i < parejasTotales * 2; i++){
        document.getElementById(""+i).setAttribute("class","border "+tamCarta);
    }
}

function mostrarDetrasCartas(){
    for(var i = 0; i < parejasTotales * 2; i++){
        document.getElementById(i+"").setAttribute("class","border "+tamCarta);
        document.getElementById("0"+i).setAttribute("class","border "+tamCarta);
    }
}

//se usa para coger el valor del tamaño de la carta del php
function tamCard(tam) {
    tamCarta = "carta"+tam;
    card = tam;
}

//redimensiona el tamaño de las cartas dependiendo de la eleccion de la cantidad de cartas en pantalla
function cambiarTamCartas() {
    for(var i = 0; i < parejasTotales * 2; i++){
        document.getElementById("tamCarta"+i).setAttribute("class","card"+card);
    }
    mostrarDetrasCartas();
}

//comenzar a contar el tiempo
function comenzar() {
    document.getElementById("ayuda").setAttribute("onclick","mostrarCartas()");
    document.getElementById("pause").setAttribute("onclick","pausa()");
    document.getElementById("btn-start").setAttribute("class","none-display");
    segundos = segundos++;
    contador = setInterval(function(){
        if(segundos>=60){
            minutos++;
            segundos = 0;
        }
        if(segundos<10){
            if(minutos<10)
                document.getElementById("tiempo").innerHTML = "0"+minutos+":0"+segundos;
            else{
                document.getElementById("tiempo").innerHTML = minutos+":0"+segundos;
            }
        }
        else if(segundos>=10)
            if(minutos<10)
                document.getElementById("tiempo").innerHTML = "0"+minutos+":"+segundos;
            else{
                document.getElementById("tiempo").innerHTML = minutos+":"+segundos;
            }
        segundos++;
    },1000);
}

//pausar tiempo
function pausa() {
    document.getElementById("ayuda").removeAttribute("onclick");
    document.getElementById("btn-start").setAttribute("class","module2");
    document.getElementById("pause").removeAttribute("onclick");
    clearInterval(contador);
}
//muestra el boton guardar y oculta el boton de comenzar una vez has ganado
function mostrarBotonGuardar(){
    document.getElementById("btn-save").setAttribute("class", "module2");
    document.getElementById("btn-start").removeAttribute("class");
    document.getElementById("btn-start").setAttribute("class", "none-display");
}

//bloquea los botones que no quiero que se usen cuando el usuario realiza ciertas acciones
function bloquearBotones() {
    document.getElementById("ayuda").removeAttribute("onclick");
    document.getElementById("pause").removeAttribute("onclick");
    document.getElementById("botonRes").removeAttribute("onclick");
}