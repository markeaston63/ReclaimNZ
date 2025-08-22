<?php
// api/logout.php
session_start();
session_unset(); // Unset all session variables
session_destroy(); // Destroy the session

echo json_encode(array("status" => "success", "message" => "Logged out successfully"));
?>
