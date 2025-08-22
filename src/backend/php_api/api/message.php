<?php

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // Adjust for production
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once '../config/db.php'; // Include database connection
require_once __DIR__ . '/../lib/mailer.php'; // Include custom mailer class
require_once __DIR__ . '/../config/log.php'; // Include custom logger

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);

    if (json_last_error() !== JSON_ERROR_NONE) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Invalid JSON input.']);
        exit();
    }

    $firstName = $data['firstName'] ?? '';
    $lastName = $data['lastName'] ?? '';
    $email = $data['email'] ?? '';
    $message = $data['message'] ?? '';

    // Basic validation
    if (empty($firstName) || empty($lastName) || !filter_var($email, FILTER_VALIDATE_EMAIL) || empty($message)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'All fields are required and email must be valid.']);
        exit();
    }

    try {
        $stmt = $pdo->prepare("INSERT INTO contact_messages (first_name, last_name, email, message) VALUES (:first_name, :last_name, :email, :message)");
        $stmt->bindParam(':first_name', $firstName);
        $stmt->bindParam(':last_name', $lastName);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':message', $message);
        $success = $stmt->execute();

        if (!$success) {
            custom_log("PDO execute failed: " . implode(", ", $stmt->errorInfo()));
            echo json_encode(['success' => false, 'message' => 'Database insert failed.']);
            exit();
        }

        // Prepare email content
        $fullName = $firstName . ' ' . $lastName;
        $to = "admin@reclaimnz.kiwi";
        $subject = "New Contact Submission";
        $emailMessage = "A new contact form has been submitted:\n\n";
        $emailMessage .= "Name: $fullName\n";
        $emailMessage .= "Email: $email\n";
        $emailMessage .= "Message:\n$message\n";

        // Send the email using Mailer class
        $mailer = new Mailer();
        $mailer->send($to, $subject, $emailMessage);

        echo json_encode(['success' => true, 'message' => 'Your message has been sent successfully!']);
    } catch (\PDOException $e) {
        custom_log("Error inserting contact message: " . $e->getMessage());
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Server error. Please try again later.', 'error' => $e->getMessage()]);
    }
} else {
    custom_log("Method not allowed");
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed.']);
}
?>