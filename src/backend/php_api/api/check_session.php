<?php
// api/check_session.php
session_start();
if (isset($_SESSION['user_id'])) {
    echo json_encode(array("status" => "success", "isLoggedIn" => true));
} else {
    echo json_encode(array("status" => "success", "isLoggedIn" => false));
}
?>