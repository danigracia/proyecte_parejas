<html>
    <head>
        <link rel="stylesheet" type="text/css" href="css/style_form_initial.css"/>
        <script type="text/javascript" src="js/index.js"></script>
    </head>

    <body>
        <div id="bg">
            <div class="module">
                <ul>
                    <li class="tab activeTab" id="tab1" onclick="openTab('play')"><img src="img/play.png" alt="" class="icon"/></li>
                    <li class="tab" id="tab2" onclick="openTab('conf')"><img src="img/config.png" alt="" class="icon"/></li>
                </ul>

                <form class="form tabs" id="play" method="get" action="functions.php">
                    <input type="text" name="nombre" placeholder="Nombre" class="textbox" required/><br><br>
                    <input type="number" name="filas" min="1" max="10" placeholder="Filas" class="textbox" required/><br><br>
                    <input type="number" name="col" min="1" max="10" placeholder="Columnas" class="textbox" required/><br><br>
                    <input type="number" name="time" min="1" max="5" placeholder="Tiempo mostrar parejas fallidas(s)" class="textbox" required/><br><br>
                    <input class="button" type="submit" value="COMENZAR PARTIDA"/>
                </form>
                <div id="conf" class="tabs">
                    <h1>config tab</h1>
                </div>
            </div>
        </div>

        <a>Design by: Dani Gracia</a>
        <a>Copyright © 2017 All right reserved.</a>

    </body>
</html>