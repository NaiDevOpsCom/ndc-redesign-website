<?php
// client/public/api/luma.php

// 1. Allow access from your own domain (adjust as needed or rely on same-origin)
// header("Access-Control-Allow-Origin: https://yourdomain.com");

// 2. Prepare the destination URL
$base_url = 'https://api.luma.com';

// Get the path after /api/luma
$path = isset($_GET['path']) ? $_GET['path'] : '';

// Validate path to prevent traversal and SSRF
if (!$path || preg_match('#(\\.\\.|//)#', $path) || !preg_match('#^[a-zA-Z0-9/_\\-\\.\?=&]+$#', $path)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid or missing path'], JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT);
    exit;
}

$target_url = $base_url . '/' . ltrim($path, '/');

// 3. Forward the request
$method = $_SERVER['REQUEST_METHOD'];
$allowedMethods = ['GET','POST','PUT','PATCH','DELETE','OPTIONS','HEAD'];
if (!in_array($method, $allowedMethods, true)) {
    http_response_code(405);
    header('Allow: GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD');
    echo json_encode(['error' => 'Method not allowed'], JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT);
    exit;
}
$ch = curl_init($target_url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, false);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);
curl_setopt($ch, CURLOPT_TIMEOUT, 30);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
curl_setopt($ch, CURLOPT_BUFFERSIZE, 128 * 1024); // 128KB buffer
curl_setopt($ch, CURLOPT_MAXFILESIZE, 10 * 1024 * 1024); // 10MB max file size

// Forward request body for methods that may have one
if (in_array($method, ['POST', 'PUT', 'PATCH'])) {
    $body = file_get_contents('php://input');
    curl_setopt($ch, CURLOPT_POSTFIELDS, $body);
}

// Helper to sanitize header values (strip CRLF)
function sanitizeHeader($value) {
    return preg_replace('/[\r\n]+/', '', $value);
}

// Forward selected headers (Authorization, Content-Type)
$forwardHeaders = [];
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    $forwardHeaders[] = 'Authorization: ' . sanitizeHeader($_SERVER['HTTP_AUTHORIZATION']);
}
if (isset($_SERVER['CONTENT_TYPE'])) {
    $forwardHeaders[] = 'Content-Type: ' . sanitizeHeader($_SERVER['CONTENT_TYPE']);
}
if (!empty($forwardHeaders)) {
    curl_setopt($ch, CURLOPT_HTTPHEADER, $forwardHeaders);
}

$response = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$upstreamContentType = curl_getinfo($ch, CURLINFO_CONTENT_TYPE);

if (curl_errno($ch)) {
    http_response_code(500);
    error_log('Luma Proxy Error: ' . curl_error($ch));
    echo json_encode(['error' => 'Upstream request failed'], JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT);
    curl_close($ch);
    exit;
}

curl_close($ch);

// 4. Output the response
http_response_code($http_code);
if (!empty($upstreamContentType)) {
    header('Content-Type: ' . $upstreamContentType);
} else {
    header('Content-Type: application/json');
}
echo $response;
