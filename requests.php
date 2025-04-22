<?php


error_reporting(E_ALL);
ini_set('display_errors', 1);


header('Content-Type: application/json');

try {
 
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        throw new Exception('Only POST method is allowed');
    }

  
    $rawData = file_get_contents('php://input');
    $data = json_decode($rawData, true);


    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new Exception('Invalid JSON format');
    }

 
    if (
        !isset($data['tab_index']) ||
        !isset($data['days']) ||
        !isset($data['total_price']) ||
        !isset($data['discount'])
    ) {
        throw new Exception('Missing required fields');
    }


    $tabIndex = intval($data['tab_index']);
    $days = intval($data['days']);
    $totalPrice = floatval($data['total_price']);
    $discount = floatval($data['discount']);

 
    $filePath = 'requests.json';
    $existingData = [];
    if (file_exists($filePath)) {
        $existingData = json_decode(file_get_contents($filePath), true) ?? [];
    }


    $newEntry = [
        'tab_index' => $tabIndex,
        'days' => $days,
        'total_price' => $totalPrice,
        'discount' => $discount,
        'timestamp' => date('Y-m-d H:i:s'),
    ];
    $existingData[] = $newEntry;


    file_put_contents($filePath, json_encode($existingData, JSON_PRETTY_PRINT));


    echo json_encode([
        'success' => true,
        'message' => 'Request submitted successfully'
    ]);
} catch (Exception $e) {

    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Internal server error: ' . $e->getMessage()
    ]);
}