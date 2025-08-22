<?php

require_once __DIR__ . '/../config/db.php';

try {
    // Get total count and latest created_at in one query
    $stmt = $pdo->query("SELECT COUNT(*) AS total, MAX(created_at) AS last_created FROM subscribers");
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    $response = [
        'total_subscribers' => (int)$result['total'],
        'last_created_at' => $result['last_created']
    ];

    header('Content-Type: application/json');
    echo json_encode($response);
} catch (\PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database error']);
}
?>