document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    console.log(username);
    console.log(password);

    fetch('login.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ action: 'login', username: username, password: password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            alert('Login successful!');
            window.location.href = 'goals.html';
            // store username in local storage
            localStorage.setItem('username', username);
        } else {
            alert('Invalid username or password!');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

document.getElementById('signupButton').addEventListener('click', function() {
    const username = prompt('Enter a username:');
    const password = prompt('Enter a password:');

    fetch('login.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ action: 'signup', username: username, password: password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            alert('Sign up successful!');
        } else {
            alert('Username already exists!');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
