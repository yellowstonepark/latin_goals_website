document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Retrieve users from local storage
    let users = JSON.parse(localStorage.getItem('users')) || {};

    if (users[username] && users[username].password === password) {
        alert('Login successful!');
        // Redirect to goals page or dashboard
        window.location.href = 'goals.html';
    } else {
        alert('Invalid username or password!');
    }
});

document.getElementById('signupButton').addEventListener('click', function() {
    const username = prompt('Enter a username:');
    const password = prompt('Enter a password:');

    // Retrieve users from local storage
    let users = JSON.parse(localStorage.getItem('users')) || {};

    if (users[username]) {
        alert('Username already exists!');
    } else {
        // Add new user to users object
        users[username] = {
            password: password,
            goals: []
        };

        // Store updated users object in local storage
        localStorage.setItem('users', JSON.stringify(users));
        alert('Sign up successful!');
    }
});