<?php
require 'connect.php';
session_start();

$error_message = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'];
    $password = $_POST['password'];

    $stmt = $pdo->prepare("SELECT * FROM user WHERE username = ?");
    $stmt->execute([$username]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user && password_verify($password, $user['password'])) {
        $_SESSION['username'] = $user['username'];
        $_SESSION['chips'] = $user['chips'];
        header("Location: game.php");
        exit;
    } else {
        $error_message = "Hibás felhasználónév vagy jelszó.";
    }
}
?>

<!DOCTYPE html>
<html lang="hu">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Texas Holdem - Login</title>
    <link rel="stylesheet" href="login.css">
</head>
<body>
    <div id="login">
        <p>Belépés</p>
        <form action="loginPage.php" method="POST">
            <input type="text" name="username" placeholder="Felhasználónév" required>
            <br>
            <input type="password" name="password" placeholder="Jelszó" required>
            <br>
            <button id="gomb" type="submit">Bejelentkezés</button>
        </form>
        <p>Nincs még profilod? <a href="registerPage.php">Regisztrálj!</a></p>
        
        <?php if (!empty($error_message)): ?>
            <p style="color: red;"><?= $error_message; ?></p>
        <?php endif; ?>
    </div>
</body>
</html>
