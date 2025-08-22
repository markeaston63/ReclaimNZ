<?php

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once '../config/db.php'; // Include database connection
require_once __DIR__ . '/../lib/mailer.php';
require_once __DIR__ . '/../config/log.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get raw POST data
    $input = file_get_contents('php://input');
    $data = json_decode($input, true); // Decode JSON to associative array

    if (json_last_error() !== JSON_ERROR_NONE) {
        http_response_code(400); // Bad Request
        echo json_encode(['success' => false, 'message' => 'Invalid JSON input.']);
        exit();
    }

    $firstName = $data['firstName'] ?? '';
    $lastName = $data['lastName'] ?? '';
    $city = $data['city'] ?? '';
    $email = $data['email'] ?? '';

    // Basic validation
    if (empty($firstName) || empty($lastName) || empty($city) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400); // Bad Request
        echo json_encode(['success' => false, 'message' => 'All fields are required and email must be valid.']);
        exit();
    }

    $mailer = new Mailer();

    try {
        $stmt = $pdo->prepare("INSERT INTO subscribers (first_name, last_name, city, email) VALUES (:first_name, :last_name, :city, :email)");
        $stmt->bindParam(':first_name', $firstName);
        $stmt->bindParam(':last_name', $lastName);
        $stmt->bindParam(':city', $city);
        $stmt->bindParam(':email', $email);
        $stmt->execute();

        echo json_encode(['success' => true, 'message' => 'Successfully joined the mailing list!']);
    } catch (\PDOException $e) {
        // Check for duplicate entry error (e.g., duplicate email)
        if ($e->getCode() == 23000) { // SQLSTATE for Integrity Constraint Violation
            echo json_encode(['success' => false, 'message' => 'This email is already subscribed.']);
        } else {
            custom_log("Error inserting subscriber: " . $e->getMessage());
            http_response_code(500); // Internal Server Error
            echo json_encode(['success' => false, 'message' => 'Server error. Please try again later.']);
        }
    }

    try {
        // Prepare the admin notification email
        $name = $firstName . ' ' . $lastName;
        $to = "admin@reclaimnz.kiwi";
        $subject = "New Join Submission";
        $emailMessage = "A new person has joined:\n\n";
        $emailMessage .= "Name: $name\n";
        $emailMessage .= "City: $city\n";
        $emailMessage .= "Email: $email\n";
        $mailer->send($to, $subject, $emailMessage);

        // Send thank-you email to the new subscriber
        $userSubject = "Thank You for Joining ReclaimNZ!";
        $userMessage = "Dear $name,\n\n";
        $userMessage .= "A sincere thank-you for joining the ReclaimNZ campaign! We're excited to have you on board — together, we can make a real difference.\n\n";
        $userMessage .= "The ReclaimNZ Team\nEmail: info@reclaimnz.kiwi";
        $mailer->send($email, $userSubject, $userMessage);
    } catch (\PDOException $e) {
        custom_log("Error sending email: " . $mailer->ErrorInfo);
    }    
} else {
    http_response_code(405); // Method Not Allowed
    echo json_encode(['success' => false, 'message' => 'Method not allowed.']);
}
?>