<?php
session_start();

if (!isset($_SESSION['username'])) {
    header("Location: loginPage.php");
    exit;
}

$username = $_SESSION["username"];
$chips = $_SESSION['chips'];

?>
<!DOCTYPE html>
<html lang="hu">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Texas Holdem</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>Texas Holdem</h1>
    <div id="game-container">
        <div id="jatek-felulet">
            <div id="panel">
                <button onclick="StartGame()" id="startGame">Start Game</button>
                <p id="szoveg">Nyertes:</p>
                <p id="eredmeny">-</p>
                <p id="info"></p>
                <p id="ellenfel1info">Ellenfél 1 emel: </p>
                <p id="ellenfel2info">Ellenfél 2 emel:</p>
                <img id="dealerLady" src="pics/lady.png" alt="Dealer Lady">
            </div>
            <div id="asztal">
                <div id="asztal-lapok">
                    <div id="card1"></div>
                    <div id="card2"></div>
                    <div id="card3"></div>
                    <div id="card4"></div>
                    <div id="card5"></div>
                </div>
                <div id="tet-div">
                    <img id="zsetonHalom" src="pics/zsetonHalom.png" alt="ZsetonHalom">
                    <p id="tet">0$</p>
                </div>
                <div id="sajat-lapok">
                    <div id="enemyCard1-1"></div>
                    <div id="enemyCard1-2"></div>
                    <div id="myCard1"></div>
                    <div id="myCard2"></div>
                    <div id="enemyCard2-1"></div>
                    <div id="enemyCard2-2"></div>
                </div>
                <div id="egyenleg-div">
                    <img id="zseton1" src="pics/tokens.png" alt="Zseton">
                    <p id="ellenfel_1_egyenleg">Kártyás Kata: 1000$</p>
                    <img id="zseton3" src="pics/tokens.png" alt="Zseton">
                    <p id="username"><?php echo htmlspecialchars($_SESSION['username']); ?></p>
                    <p id="egyenleg"><?php echo htmlspecialchars($_SESSION['chips']); ?>$</p>
                    <img id="zseton2" src="pics/tokens.png" alt="Zseton">
                    <p id="ellenfel_2_egyenleg">All-in András: 1000$</p>
                </div>
                <div id="zseton-div">
                    <button onclick="emel(1,3)" id="zseton-1">1$</button>
                    <button onclick="emel(5,3)" id="zseton-5">5$</button>
                    <button onclick="emel(10,3)" id="zseton-10">10$</button>
                    <button onclick="emel(25,3)" id="zseton-25">25$</button>
                    <button onclick="emel(100,3)" id="zseton-100">100$</button>
                </div>
                <div id="mehet-div">
                    <button onclick="mehetAJatek()" id="mehet">Mehet!</button>
                    <input value="0" min="0" id="sajat-osszeg" type="number">
                    <button onclick="emel_custom()" id="emel">Emel</button>
                    <button onclick="dobas()" id="dob">Dob</button>
                </div>
            </div>
        </div>
    </div>
    <a href="szabalyok.html">Játékszabályzat</a>
    <form method="post" action="logout.php">
    <button type="submit">Kijelentkezés</button>
</form>


<script>
    const chips = <?php echo json_encode($chips); ?>;
    const username = <?php echo json_encode($username); ?>;
</script>


    <script src="script.js"></script>

</body>
</html>
