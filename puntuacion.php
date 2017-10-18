<link rel="stylesheet" type="text/css" href="css/styles.css" />
<script type="text/javascript" src="js/tablesorter.js"></script>

<h4>MEMORI <?php echo $_GET["col"]." x ".$_GET["fil"];?></h4>
<div id="tablaPuntuacion">
<?php
$win = $_GET["win"];
function guardarPuntuacion(){
    $fil = $_GET["fil"];
    $col = $_GET["col"];
    $intentos = $_GET["int"];
    $name = $_GET["nom"];
    $txt = $name.",".$intentos."\n";
    $f = fopen('bdd/'.$col.'x'.$fil.'.txt', 'a') or die('No puedo abrir el archivo');
    fwrite($f, $txt);
    fclose($f);
}

function puntuacion(){
    $fil = $_GET["fil"];
    $col = $_GET["col"];
    echo "<div id='puntuacion'>
                     <table>
                        <tr>
                            <th class='datosth'><p>Nombre 
                                <img onclick=\"nomAscendente()\" src=\"img/up.png\">
                                <img onclick=\"nomDescendente()\" src=\"img/down.png\">
                            </p></th>
                            <th class='datosth'><p>Intentos 
                                <img onclick=\"intAscendente()\" src=\"img/up.png\">
                                <img onclick=\"intDescendente()\" src=\"img/down.png\">
                            </p></th>
                        </tr>
                        <tr>
        ";
    $lineas = file('bdd/'.$col.'x'.$fil.'.txt');
    foreach ($lineas as $num_linea => $linea) {
        $palabra = preg_split('/[\ \n\,]+/', $linea);
        echo "<td class='datostd'>$palabra[0]</td>";
        echo "<td class='datostd'>$palabra[1]</td>";
        echo "</tr>";
    }
    echo "</table>
            </div><br>";
}
if($win>0){
    guardarPuntuacion();
    puntuacion();
}
else{
    puntuacion();
    echo "<a href='javascript:history.back(-1);'><button>Volver atras</button></a>";
}

?>
    <a href='index.php'><button>Crear nueva partida</button></a>
</div>

