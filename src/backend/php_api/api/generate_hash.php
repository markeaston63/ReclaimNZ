<?php
// Simple script to generate a hashed password

$plain_password = "ge0ffp4rk3r"; // Default password for testing


$hashed_password = password_hash($plain_password, PASSWORD_DEFAULT);

echo "Plain password: " . $plain_password . "\n";
echo "Hashed password: " . $hashed_password . "\n";
echo "\nSQL to update database:\n";
echo "UPDATE `users` SET `password` = '" . $hashed_password . "' WHERE user_name = 'geoff';\n";
?>
