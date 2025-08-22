<?php
return [
    'host' => 'reclaimnz.kiwi',
    'username' => 'info@reclaimnz.kiwi',
    'password' => 'YVi1AMmuPIo~', 
    'from' => 'info@reclaimnz.kiwi',
    'fromName' => 'Reclaim NZ',
    'port' => 465, // Or 465 for SMTPS
    'encryption' => \PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_SMTPS, // Or ENCRYPTION_STARTTLS
    'SMTPDebug'  => \PHPMailer\PHPMailer\SMTP::DEBUG_SERVER,
    'Debugoutput' => 'error_log'
];
?>