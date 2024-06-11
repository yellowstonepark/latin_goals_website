document.addEventListener('DOMContentLoaded', function() {
    const goalsList = document.getElementById('goalsList');
    const goalForm = document.getElementById('goalForm');
    const newGoalInput = document.getElementById('newGoal');
    const username = localStorage.getItem('username'); // Retrieve username from localStorage

    if (!username) {
        alert('You must be logged in to view and manage your goals.');
        window.location.href = 'login.html';
        return;
    }

    function fetchGoals() {
        fetch('goals.php?action=get&username=' + encodeURIComponent(username))
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    renderGoals(data.goals);
                } else {
                    console.error('Failed to fetch goals:', data.message);
                }
            })
            .catch(error => console.error('Error fetching goals:', error));
    }

    function saveGoal(goal) {
        fetch('goals.php?action=add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ action: 'add', username: username, goal: goal })
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                fetchGoals();
            } else {
                console.error('Failed to save goal:', data.message);
            }
        })
        .catch(error => console.error('Error saving goal:', error));
    }

    function deleteGoal(index) {
        fetch('goals.php?action=delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ action: 'delete', username: username, index: index })
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                fetchGoals();
            } else {
                console.error('Failed to delete goal:', data.message);
            }
        })
        .catch(error => console.error('Error deleting goal:', error));
    }

    function renderGoals(goals) {
        goalsList.innerHTML = '';
        goals.forEach((goal, index) => {
            const li = document.createElement('li');
            li.textContent = goal;
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => {
                deleteGoal(index);
            });
            li.appendChild(deleteButton);
            goalsList.appendChild(li);
        });
    }

    goalForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const newGoal = newGoalInput.value.trim();
        if (newGoal) {
            saveGoal(newGoal);
            newGoalInput.value = '';
        }
    });

    fetchGoals();
});
