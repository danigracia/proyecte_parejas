<link rel="stylesheet" type="text/css" href="css/styles.css"/>
<script type="text/javascript" src="js/functions.js"></script>
<title>Game</title>

<head>
    <audio id="first-click" src="sound/primerClickReload.wav" preload="auto"></audio>
    <audio id="second-click" src="sound/segundoClickShoot.wav" preload="auto"></audio>
    <audio id="error" src="sound/error.wav" preload="auto"></audio>
    <audio id="acierto" src="sound/acierto.wav" preload="auto"></audio>
    <audio id="win" src="sound/win.wav" preload="auto"></audio>
</head>
<body onload="cambiarTamCartas()">
    <div id="bg">
        <div id="btns">
            <img class="btn" id="btnVolum" onclick="soundMuted()" src="img/speakerOn.png"/>
            <a href='index.php'><img class="btn" src="img/atras.png"/></a>
            <img class="btn" onclick="reset()" id="botonRes" src="img/reset.png"/>
            <img class="btn" src="img/table.png" id="buttonSubmit" onclick="darValuesSubmit('<?php echo $_GET["nombre"];?>','<?php $option = $_GET["option"]; $valores = explode("x",$option); echo $valores[0];?>','<?php $option = $_GET["option"]; $valores = explode("x",$option); echo $valores[1];?>')"/>
            <img class="btn" onclick="" id="ayuda" src="img/help.png"/>
            <img class="btn" onclick="pauseTime()" id="pause" src="img/pause-btn.png"/>
        </div>
        <a id="a">MEMORI <?php $valores = explode("x",$_GET["option"]); echo $valores[0]." x ".$valores[1];?></a>
        <div id="btn-start" class="module2">
            <img class="btn center" onclick="startTime()" id="start" src="img/play-btn.png"/>
        </div>
        <div id="btn-save" class="module2 none-display">
            <img id="save" class="btn center" onclick="darValuesSubmit('<?php echo $_GET["nombre"];?>','<?php $option = $_GET["option"]; $valores = explode("x",$option); echo $valores[0];?>','<?php $option = $_GET["option"]; $valores = explode("x",$option); echo $valores[1];?>')" src="img/save.png"/>
        </div>

        <div id="tablero" class="module">
            <div class="mensaje">
                <h4><p id="mensaje">Suerte, la vas a necesitar!</p></h4>
                <h4>
                    <p class="div-4">Intentos: <span id="intentos">0</span></p>
                    <p class="div-4">Parejas: <span id="parejas">0</span></p>
                    <p class="div-4">Ayudas restantes: <span id="ayudas">3</span></p>
                    <p class="div-4">Tiempo: <span id="tiempo">00:00</span></p>
                </h4>
            </div>
            <div id="tablaCartas">
                <table>
                    <?php
                    session_start();
                    $name = $_GET["nombre"];
                    function mezclarCartas($array_cartas){
                        shuffle($array_cartas);
                        return $array_cartas;
                    }

                    function generarCartas(){
                        $option = $_GET["option"];
                        $valores = explode("x",$option);
                        $filas = $valores[0];
                        $col = $valores[1];
                        echo "<script>tamCard($filas);</script>";

                        if($filas*$col%2==0){
                            $timeShowCards = $_GET["time"];
                            $total_parejas = $filas*$col/2;
                            $array_cartas = array();
                            for( $a = 1; $a<=$total_parejas;$a++){
                                array_push($array_cartas, $a);
                                array_push($array_cartas, $a);
                            }

                            if (isset($_SESSION['arrayCartas'])){
                                $array_cartas = $_SESSION['arrayCartas'];
                            }
                            else {
                                $array_cartas = mezclarCartas($array_cartas);
                                $_SESSION['arrayCartas'] = $array_cartas;
                            }

                            $ar = 0;
                            for( $i=1 ; $i <= $col; $i++ ) {
                                for ($j = 0; $j < $filas; $j++) {;
                                    echo "<td id='clicks'>
                                <label>
                                    <input type='checkbox' id='check".$ar."'/>
                                    <div id='tamCarta$ar' class=''>
                                        <div class='front'><p class='img'><img class='border none-display' id='".$ar."' onclick='controlCheckFront($array_cartas[$ar], $ar)' src='img/carta.jpe'></p></div>
                                        <div class='back'><p class='img'><img class='border none-display' id='0".$ar."' onclick='controlCheckBack($ar)' src='img/par".$array_cartas[$ar].".jpg'></p></div>
                                    </div>
                                </label>
                              </td>\n";
                                    $ar++;
                                }

                                echo "</tr>\n";
                            }
                            echo "<script>pasarVar($total_parejas ,$timeShowCards)</script>";
                        }
                        else{
                            echo "No se puede generar esta partida porque $filas x $col da un resultado impar<br> y no se podrian resolver todas las parejas.<br>";
                        }
                    }
                    generarCartas();
                    ?>
                </table>

            </div>
        </div>
    </div>
    <div id="layer" style="display:none;">
        <form method="get" action="puntuacion.php">
            <input type="text" id="nombre" name="nom" value="anonimo"/>
            <input type="text" id="filas" name="fil" value="0"/>
            <input type="text" id="columnas" name="col" value="0"/>
            <input type="number" id="int" name="int" value="0"/>
            <input type="number" id="ganadas" name="win" value="0"/>
            <input type="number" id="segundos" name="seg" value="0"/>
            <input id="submitPunt" type="submit" value="COMENZAR PARTIDA"/>
        </form>
    </div>
</body>


