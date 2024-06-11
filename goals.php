<?php
header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $action = $_GET['action'] ?? null;
    $username = $_GET['username'] ?? null;
} elseif ($method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    $action = $input['action'] ?? null;
    $username = $input['username'] ?? null;
} else {
    $action = null;
    $username = null;
}

if (!$action || !$username) {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request']);
    exit();
}

// Define the file path
$file = 'users.json';

// Get existing data
if (file_exists($file)) {
    $json_data = file_get_contents($file);
    $users = json_decode($json_data, true);
} else {
    $users = [];
}

if (!isset($users[$username])) {
    echo json_encode(['status' => 'error', 'message' => 'User not found']);
    exit();
}

if ($action === 'get') {
    echo json_encode(['status' => 'success', 'goals' => $users[$username]['goals'] ?? []]);
} elseif ($action === 'add') {
    $goal = $input['goal'] ?? null;
    if ($goal) {
        $users[$username]['goals'][] = $goal;
        file_put_contents($file, json_encode($users, JSON_PRETTY_PRINT));
        echo json_encode(['status' => 'success']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Invalid goal']);
    }
} elseif ($action === 'delete') {
    $index = $input['index'] ?? null;
    if (is_numeric($index) && isset($users[$username]['goals'][$index])) {
        array_splice($users[$username]['goals'], $index, 1);
        file_put_contents($file, json_encode($users, JSON_PRETTY_PRINT));
        echo json_encode(['status' => 'success']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Invalid goal index']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid action']);
}
?>
