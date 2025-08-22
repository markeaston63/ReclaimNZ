<?php
// php_api/config/db.php

$host = 'localhost'; // Usually 'localhost' for shared hosting or a specific hostname
$db   = 'reclaimn_website2'; // Your database name
$user = 'reclaimn_admin'; // Your database username
$pass = 'p!3mOpZiD0WB'; // Your database password
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (\PDOException $e) {
    // Log the error for debugging (don't display sensitive info in production)
    error_log("Database connection failed: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Database connection error.']);
    exit;
}
?>