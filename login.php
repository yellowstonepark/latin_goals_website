<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Method Not Allowed']);
    exit();
}

// Get the JSON input
$data = json_decode(file_get_contents('php://input'), true);

if ($data) {
    $action = $data['action'];
    $username = $data['username'];
    $password = $data['password'];

    // Define the file path
    $file = 'users.json';

    // Get existing data
    if (file_exists($file)) {
        $json_data = file_get_contents($file);
        $users = json_decode($json_data, true);
    } else {
        $users = [];
    }

    if ($action === 'signup') {
        if (isset($users[$username])) {
            echo json_encode(['status' => 'error', 'message' => 'Username already exists!']);
        } else {
            // Add new user
            $users[$username] = ['password' => $password, 'goals' => []];
            file_put_contents($file, json_encode($users, JSON_PRETTY_PRINT));
            echo json_encode(['status' => 'success']);
        }
    } elseif ($action === 'login') {
        if (isset($users[$username]) && $users[$username]['password'] === $password) {
            echo json_encode(['status' => 'success']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Invalid username or password!']);
        }
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid input!']);
}
?>
