<?php
// protected_page.php

// Start the session
session_start();

// Check if the user is logged in
if (!isset($_SESSION['user_id'])) {
    // If not logged in, redirect to the login page or show an error
    http_response_code(403); // Forbidden
    echo json_encode(array("status" => "error", "message" => "Access denied. Please log in."));
    exit;
}

// If the user is logged in, you can now access their session data
$user_id = $_SESSION['user_id'];
$user_name = $_SESSION['user_name'];

// You can now write the code for the protected content
echo json_encode(array("status" => "success", "message" => "Welcome, " . $user_name . "! This is a protected page."));

?>