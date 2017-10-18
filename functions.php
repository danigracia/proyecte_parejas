<link rel="stylesheet" type="text/css" href="css/styles.css"/>
<script type="text/javascript" src="js/functions.js"></script>

<body>
    <h3>MEMORI</h3>
    <h4>Mensajes: <p id="mensaje">Suerte, la vas a necesitar!</p></h4>
    <div id="tablaCartas">
        <table>
            <?php
            $name = $_GET["nombre"];
            function mezclarCartas($array_cartas){
                shuffle($array_cartas);
                return $array_cartas;
            }

            function generarCartas(){
                $filas = $_GET["filas"];
                $col = $_GET["col"];
                if($filas*$col%2==0){
                    $timeShowCards = $_GET["time"];
                    $total_parejas = $filas*$col/2;
                    $array_cartas = array();
                    for( $a = 1; $a<=$total_parejas;$a++){
                        array_push($array_cartas, $a);
                        array_push($array_cartas, $a);
                    }
                    $array_cartas = mezclarCartas($array_cartas);
                    $ar = 0;
                    for( $i=1 ; $i <= $col; $i++ ) {
                        for ($j = 0; $j < $filas; $j++) {;
                            echo "<td id='clicks'>
                        <label>
                            <input type='checkbox' id='check".$ar."''/>
                            <div class='card'>
                                <div class='front'><p class='img'><img id='".$ar."' onclick='controlCheckFront($array_cartas[$ar], $ar)' src='img/carta.jpe'></p></div>
                                <div class='back'><p class='img'><img onclick='controlCheckBack($ar)' src='img/par".$array_cartas[$ar].".jpg'></p></div>
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
    <div>
        <h4>
            Intentos: <span id="intentos">0</span><br><br>
            Parejas: <span id="parejas">0</span>

        </h4>
    </div>
    <div id="buttons">
        <a href='index.php'><button>Volver atras</button></a>
        <a onclick="reset()"><button id="botonRes">Reiniciar</button></a>
        <a onclick="darValuesSubmit('<?php echo $_GET["nombre"];?>','<?php echo $_GET["filas"];?>','<?php echo $_GET["col"];?>')"><button id="buttonSubmit">Ver puntuación</button></a>
    </div>
    <div id="layer" style="display:none;">
        <form method="get" action="puntuacion.php">
            <input type="text" id="nombre" name="nom" value="anonimo"/>
            <input type="text" id="fil" name="fil" value="0"/>
            <input type="text" id="col" name="col" value="0"/>
            <input type="number" id="int" name="int" value="0"/>
            <input type="number" id="win" name="win" value="0"/>
            <input id="submitPunt" type="submit" value="COMENZAR PARTIDA"/>
        </form>
    </div>
</body>
