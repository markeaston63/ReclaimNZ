<?php
function custom_log($message) {
    $logFile = __DIR__ . '/../logs/errors.log';
    $date = date('Y-m-d H:i:s');
    file_put_contents($logFile, "[$date] $message\n", FILE_APPEND);
}