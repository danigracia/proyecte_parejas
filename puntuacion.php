<link rel="stylesheet" type="text/css" href="css/style_table.css" />
<script type="text/javascript" src="js/tablesorter.js"></script>
<script src="js/snow.js"></script>
<script src="js/jquery.snow.js"></script>
<title>Puntuación</title>


<body>
    <div id="bg">
        <a>MEMORI <?php echo $_GET["col"]." x ".$_GET["fil"];?> RECORDS</a>
        <div class="module">
            <ul>
                <li class="tab tablinks activeTab" onclick="openTab(event, 'World')">World</li>
                <li class="tab tablinks" onclick="openTab(event, 'Session')">Session</li>
            </ul>
            <div id="Session" class="tabcontent">
                <label>
                    <div id="tablaPuntuacion">
                        <?php
                        session_start();
                        $win = $_GET["win"];
                        function guardarPuntuacionSession(){
                            $segundos = $_GET["seg"];
                            $fil = $_GET["fil"];
                            $col = $_GET["col"];
                            $intentos = $_GET["int"];
                            $name = $_GET["nom"];
                            $datos_partida = $name.','.$intentos.','.$segundos;
                            if(isset($_SESSION['array'.$col.'x'.$fil])){
                                array_push($_SESSION['array'.$col.'x'.$fil],$datos_partida);
                            }
                            else{
                                $_SESSION['array'.$col.'x'.$fil][0]= $datos_partida;
                                unset($_SESSION['array'.$col.'x'.$fil][0]);
                                array_push($_SESSION['array'.$col.'x'.$fil],$datos_partida);

                            }
                        }

                        function puntuacionSession(){
                            $fil = $_GET["fil"];
                            $col = $_GET["col"];
                            echo "<div id='puntuacionSession'>
                     <table>
                        <tr>
                            <th class='datosth'><p>Nombre 
                                <img onclick=\"ascendente('puntuacionSession','0')\" src=\"img/up.png\">
                                <img onclick=\"descendente('puntuacionSession','0')\" src=\"img/down.png\">
                            </p></th>
                            <th class='datosth'><p>Intentos 
                                <img onclick=\"ascendente('puntuacionSession','1')\" src=\"img/up.png\">
                                <img onclick=\"descendente('puntuacionSession','1')\" src=\"img/down.png\">
                            </p></th>
                            <th class='datosth'><p>Segundos
                                <img onclick=\"ascendente('puntuacionSession','2')\" src=\"img/up.png\">
                                <img onclick=\"descendente('puntuacionSession','2')\" src=\"img/down.png\">
                            </p></th>
                        </tr>
                        <tr>
        ";
                            $lineas = $_SESSION['array'.$col.'x'.$fil];
                            foreach ($lineas as $num_linea => $linea) {
                                $palabra = preg_split('/[\ \n\,]+/', $linea);
                                echo "<td class='datostd'>$palabra[0]</td>";
                                echo "<td class='datostd'>$palabra[1]</td>";
                                echo "<td class='datostd'>$palabra[2]</td>";
                                echo "</tr>";
                            }
                            echo "</table>
            </div><br>";
                        }
                        if($win>0){
                            guardarPuntuacionSession();
                            puntuacionSession();

                        }
                        else {
                            $fil = $_GET["fil"];
                            $col = $_GET["col"];
                            if(isset($_SESSION['array'.$col.'x'.$fil])){
                                puntuacionSession();
                            }
                        }
                        ?>

                    </div></div>
                </label>


            <div id="World" class="tabcontent" style="display: block;">

                <label>
                    <div id="tablaPuntuacion">
                        <?php
                        $win = $_GET["win"];
                        function guardarPuntuacion(){
                            $segundos = $_GET["seg"];
                            $fil = $_GET["fil"];
                            $col = $_GET["col"];
                            $intentos = $_GET["int"];
                            $name = $_GET["nom"];
                            $txt = $name.",".$intentos.",".$segundos."\n";
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
                                <img onclick=\"ascendente('puntuacion','0')\" src=\"img/up.png\">
                                <img onclick=\"descendente('puntuacion','0')\" src=\"img/down.png\">
                            </p></th>
                            <th class='datosth'><p>Intentos 
                                <img onclick=\"ascendente('puntuacion','1')\" src=\"img/up.png\">
                                <img onclick=\"descendente('puntuacion','1')\" src=\"img/down.png\">
                            </p></th>
                            <th class='datosth'><p>Segundos
                                <img onclick=\"ascendente('puntuacion','2')\" src=\"img/up.png\">
                                <img onclick=\"descendente('puntuacion','2')\" src=\"img/down.png\">
                            </p></th>
                        </tr>
                        <tr>
        ";
                            $lineas = file('bdd/'.$col.'x'.$fil.'.txt');
                            foreach ($lineas as $num_linea => $linea) {
                                $palabra = preg_split('/[\ \n\,]+/', $linea);
                                echo "<td class='datostd'>$palabra[0]</td>";
                                echo "<td class='datostd'>$palabra[1]</td>";
                                echo "<td class='datostd'>$palabra[2]</td>";
                                echo "</tr>";
                            }
                            echo "</table>
            </div><br>";
                        }
                        if($win>0){
                            guardarPuntuacion();
                            puntuacion();
                            echo "</div></label></div></div>";
                            echo "<a href='index.php'><button id=\"newgame2\" class=\"button\">Crear nueva partida</button></a>";

                        }
                        else{
                            puntuacion();
                            echo "</div></label></div></div>";
                            echo "<a href='javascript:history.back(-1);'><button class='button'>Volver atras</button></a>
                        <a href='index.php'><button class=\"button\">Crear nueva partida</button></a>
                </div>
            </label>
        </div>
        ";
                        }

                        ?>
                        <a href='index.php'><button id="newgame2" class="button none-display">Crear nueva partida</button></a>
                    </div>
                </label>

            </div>


        </div>
    </div>

</body>
<script>
    $(document).ready( function(){
        $.fn.snow({ minSize: 5, maxSize: 50, newOn: 120, flakeColor: '#BBABAB' });

    });
</script>




