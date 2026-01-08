<?php
// client/public/api/luma.php

// 1. Allow access from your own domain (adjust as needed or rely on same-origin)
// header("Access-Control-Allow-Origin: https://yourdomain.com");

// 2. Prepare the destination URL
// We assume the frontend requests /api/luma/something
// and we want to fetch https://api.luma.com/something

$base_url = 'https://api.luma.com';

// Get the path after /api/luma
// If your server rewrites /api/luma/(.*) to luma.php?path=$1, use $_GET['path']
// Or parse $_SERVER['REQUEST_URI'] manually.
// For simplicity with the proposed .htaccess rule: `RewriteRule ^api/luma/(.*)$ api/luma.php?path=$1 [QSA,L]`


// Ensure response is always JSON
header('Content-Type: application/json');

$path = isset($_GET['path']) ? $_GET['path'] : '';

if (!$path) {
    http_response_code(400);
    echo json_encode(['error' => 'No path provided'], JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT);
    exit;
}

$target_url = $base_url . '/' . ltrim($path, '/');

// 3. Forward the request
$ch = curl_init($target_url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);

// Forward headers if needed (e.g., Authorization)
// $headers = [];
// if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
//     $headers[] = 'Authorization: ' . $_SERVER['HTTP_AUTHORIZATION'];
// }
// curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

$response = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);

if (curl_errno($ch)) {
    http_response_code(500);
    // Use JSON_HEX_* flags to prevent XSS while keeping valid JSON
    echo json_encode(['error' => 'Curl error: ' . curl_error($ch)], JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT);
    curl_close($ch);
    exit;
}

curl_close($ch);

// 4. Output the response
http_response_code($http_code);
echo $response;
