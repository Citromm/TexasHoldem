<?php
require 'connect.php';
session_start();

if (!isset($_SESSION['username'])) {
    http_response_code(403);
    echo json_encode(["error" => "Not authorized"]);
    exit;
}

$username = $_SESSION['username'];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $newChips = $_POST['chips'];
    $stmt = $pdo->prepare("UPDATE user SET chips = ? WHERE username = ?");
    if ($stmt->execute([$newChips, $username])) {
        $_SESSION['chips'] = $newChips;
        echo json_encode(["success" => true, "chips" => $newChips]);
    } else {
        echo json_encode(["success" => false, "error" => "Failed to update"]);
    }
    exit;
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $stmt = $pdo->prepare("SELECT chips FROM user WHERE username = ?");
    $stmt->execute([$username]);
    $chips = $stmt->fetchColumn();
    $_SESSION['chips'] = $chips;
    echo json_encode(["chips" => $chips]);
    exit;
}

http_response_code(400);
echo json_encode(["error" => "Invalid request"]);
?>
