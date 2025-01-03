<?php
require 'connect.php';
session_start();

$error_message = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'];
    $password = $_POST['password'];
    $password_confirm = $_POST['password_confirm'];

    if ($password !== $password_confirm) {
        $error_message = "A két jelszó nem egyezik!";
    } else {
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);

        try {
            $stmt = $pdo->prepare("INSERT INTO user (username, password) VALUES (?, ?)");
            if ($stmt->execute([$username, $hashed_password])) {
                header("Location: game.php");
                exit;
            } else {
                $error_message = "Hiba történt a regisztráció során.";
            }
        } catch (PDOException $e) {
            $error_message = "Hiba történt: " . $e->getMessage();
        }
    }
}
?>

<!DOCTYPE html>
<html lang="hu">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Texas Holdem - Regisztráció</title>
    <link rel="stylesheet" href="register.css">
</head>
<body>
    <div id="register">
        <p>Regisztráció</p>
        <form action="registerPage.php" method="POST">
            <input type="text" name="username" placeholder="Felhasználónév" required>
            <br>
            <input type="password" name="password" placeholder="Jelszó" required>
            <br>
            <input type="password" name="password_confirm" placeholder="Jelszó megerősítése" required>
            <br>
            <button type="submit">Regisztráció</button>
        </form>
        <p>Már van profilod? <a href="loginPage.php">Jelentkezz be!</a></p>

        <?php if (!empty($error_message)): ?>
            <p style="color: red;"><?= $error_message; ?></p>
        <?php endif; ?>
    </div>
</body>
</html>
