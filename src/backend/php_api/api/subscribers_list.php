<?php

header("Access-Control-Allow-Origin: *"); 
header("Content-Type: application/json; charset=UTF-8");

require_once __DIR__ . '/../config/db.php';

try {
    // Get all subscribers with pagination support
    $page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
    $limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 1000;
    $offset = ($page - 1) * $limit;
    
    // Get total count
    $countStmt = $pdo->query("SELECT COUNT(*) AS total FROM subscribers");
    $totalCount = $countStmt->fetch(PDO::FETCH_ASSOC)['total'];
    
    // Get subscribers with pagination
    $stmt = $pdo->prepare("SELECT id, first_name, last_name, city, email, created_at FROM subscribers ORDER BY id DESC LIMIT :limit OFFSET :offset");
    $stmt->bindParam(':limit', $limit, PDO::PARAM_INT);
    $stmt->bindParam(':offset', $offset, PDO::PARAM_INT);
    $stmt->execute();
    
    $subscribers = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $response = [
        'subscribers' => $subscribers,
        'total_count' => (int)$totalCount,
        'page' => $page,
        'limit' => $limit,
        'total_pages' => ceil($totalCount / $limit)
    ];

    echo json_encode($response);
} catch (\PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
}
?>
