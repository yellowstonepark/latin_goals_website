document.addEventListener('DOMContentLoaded', function() {
    const goalsList = document.getElementById('goalsList');
    const goalForm = document.getElementById('goalForm');
    const newGoalInput = document.getElementById('newGoal');
    const username = sessionStorage.getItem('username'); // Assuming username is stored in session storage

    // Load goals from local storage
    let users = JSON.parse(localStorage.getItem('users')) || {};
    let userGoals = users[username]?.goals || [];

    function saveGoals() {
        users[username].goals = userGoals;
        localStorage.setItem('users', JSON.stringify(users));
    }

    function renderGoals() {
        goalsList.innerHTML = '';
        userGoals.forEach((goal, index) => {
            const li = document.createElement('li');
            li.textContent = goal;
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => {
                userGoals.splice(index, 1);
                saveGoals();
                renderGoals();
            });
            li.appendChild(deleteButton);
            goalsList.appendChild(li);
        });
    }

    goalForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const newGoal = newGoalInput.value.trim();
        if (newGoal) {
            userGoals.push(newGoal);
            saveGoals();
            renderGoals();
            newGoalInput.value = '';
        }
    });

    renderGoals();
});