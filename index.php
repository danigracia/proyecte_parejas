<html>
    <head>
        <link rel="stylesheet" type="text/css" href="css/style_form_initial.css"/>
        <script type="text/javascript" src="js/index.js"></script>
        <?php
            session_start();
            if (isset($_SESSION['arrayCartas'])){
                unset($_SESSION['arrayCartas']);
            }?>
    </head>

    <body>
        <div id="bg">
            <div class="module">
                <ul>
                    <li class="tab activeTab" id="tab1" onclick="openTab('play')"><img src="img/play.png" alt="" class="icon"/></li>
                </ul>

                <form class="form tabs" id="play" method="get" action="functions.php">
                    <input type="text" name="nombre" placeholder="Nombre" class="textbox" required/><br><br>
                    <label>
                        <select name="option">
                            <option value="4x4" selected>4x4</option>
                            <option value="6x6">6x6</option>
                            <option value="8x8">8x8</option>
                        </select>
                    </label>
                    <input type="number" name="time" min="1" max="5" placeholder="Tiempo mostrar parejas fallidas(s)" class="textbox" required/><br><br>
                    <input class="button" type="submit" value="COMENZAR PARTIDA"/>
                </form>
            </div>
            <div class="but-des">
                <button onclick="destroy()" class="button">Destruir Session PHP</button>
            </div>
        </div>

        <a>Design by: Dani Gracia</a>
        <a>Copyright © 2017 All right reserved.</a>

    </body>
    <script>
        function destroy(){
            session_destroy();
        }
    </script>
</html>