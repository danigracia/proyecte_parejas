//funcion para los tabs de la pagina index (falta añadir el tema del sonido y su configuracion en el tab de config) sprint2
function openTab(tabName) {
    if(tabName=="play")
        var tab = "tab1";
    else{
        var tab = "tab2";
    }
    var i;
    var x = document.getElementsByClassName("tabs");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    document.getElementById(tabName).style.display = "block";
    if(tab=="tab1"){
        document.getElementById(tab).setAttribute('class','tab activeTab');
        document.getElementById("tab2").setAttribute('class','tab');
    }
    else{
        document.getElementById(tab).setAttribute('class','tab activeTab');
        document.getElementById("tab1").setAttribute('class','tab');
    }
}