<?php

// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Set headers for JSON responses
header('Content-Type: application/json');

try {
    // Check if it's a POST request
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        throw new Exception('Only POST method is allowed');
    }

    // Get raw POST data
    $rawData = file_get_contents('php://input');
    $data = json_decode($rawData, true);

    // Validate JSON decoding
    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new Exception('Invalid JSON format');
    }

    // Validate required fields
    if (
        !isset($data['tab_index']) ||
        !isset($data['days']) ||
        !isset($data['total_price']) ||
        !isset($data['discount'])
    ) {
        throw new Exception('Missing required fields');
    }

    // Sanitize input data
    $tabIndex = intval($data['tab_index']);
    $days = intval($data['days']);
    $totalPrice = floatval($data['total_price']);
    $discount = floatval($data['discount']);

    // Save data to a file (or database)
    $filePath = 'requests.json';
    $existingData = [];
    if (file_exists($filePath)) {
        $existingData = json_decode(file_get_contents($filePath), true) ?? [];
    }

    // Add new entry
    $newEntry = [
        'tab_index' => $tabIndex,
        'days' => $days,
        'total_price' => $totalPrice,
        'discount' => $discount,
        'timestamp' => date('Y-m-d H:i:s'),
    ];
    $existingData[] = $newEntry;

    // Save updated data back to the file
    file_put_contents($filePath, json_encode($existingData, JSON_PRETTY_PRINT));

    // Send success response
    echo json_encode([
        'success' => true,
        'message' => 'Request submitted successfully'
    ]);
} catch (Exception $e) {
    // Send error response
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Internal server error: ' . $e->getMessage()
    ]);
}