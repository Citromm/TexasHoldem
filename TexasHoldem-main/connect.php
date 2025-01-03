<?php
$host = 'mysql.caesar.elte.hu';
$dbname = 'forrolevi';
$username = 'forrolevi';
$password = 'TKuPGVYC49faYRtC';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);

    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

} catch (PDOException $e) {
    die("Nem sikerült csatlakozni: " . $e->getMessage());
}
?>
