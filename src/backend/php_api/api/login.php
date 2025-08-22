<?php

header("Access-Control-Allow-Origin: *"); 
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


ini_set('display_errors', 0); 
error_reporting(E_ALL); 

session_start();


require_once __DIR__ . '/../config/log.php';
require_once __DIR__ . '/../config/db.php'; 

$user_name = isset($_POST['user_name']) ? (string)$_POST['user_name'] : '';
$plain_password = isset($_POST['password']) ? (string)$_POST['password'] : ''; // This is the plain text password from the form


if (empty($user_name) || empty($plain_password)) {
    http_response_code(400); 
    echo json_encode(array("status" => "error", "message" => "Username and password are required."));
    exit();
}

try {

    $stmt = $pdo->prepare("SELECT id, user_name, password FROM users WHERE user_name = :user_name");
    $stmt->bindParam(':user_name', $user_name, PDO::PARAM_STR);
    $stmt->execute();

    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user) {
        if (password_verify($plain_password, $user['password'])) { 
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['user_name'] = $user['user_name'];

            echo json_encode(array("status" => "success", "message" => "Login successful"));
        } else {
            http_response_code(401); 
            echo json_encode(array("status" => "error", "message" => "Invalid username or password"));
        }
    } else {
        http_response_code(401); 
        echo json_encode(array("status" => "error", "message" => "Invalid username or password"));
    }

} catch (\PDOException $e) {
    custom_log("Login PDO error: " . $e->getMessage()); 
    http_response_code(500);
    echo json_encode(array("status" => "error", "message" => "An internal server error occurred. Please try again later."));
}
?>