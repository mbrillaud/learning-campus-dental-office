document.addEventListener('DOMContentLoaded', () => {
    const usersList = document.getElementById('users-list');
    const userForm = document.getElementById('user-form');

    if (usersList) {
        usersList.addEventListener('change', (event) => {
            const selectedOption = event.target.selectedOptions[0];

            if (selectedOption) {
                const userData = {
                    id: selectedOption.getAttribute('data-id'),
                    firstName: selectedOption.getAttribute('data-firstName'),
                    lastName: selectedOption.getAttribute('data-lastName'),
                    email: selectedOption.getAttribute('data-email'),
                    phone: selectedOption.getAttribute('data-phone'),
                    role: selectedOption.getAttribute('data-role')
                };

                userForm.style.display = 'block';

                document.getElementById('user-id').value = userData.id;
                document.getElementById('user-firstName').value = userData.firstName;
                document.getElementById('user-lastName').value = userData.lastName;
                document.getElementById('user-email').value = userData.email;
                document.getElementById('user-phone').value = userData.phone;
                document.getElementById('user-role').value = userData.role;
            }
        });
    }

    if (userForm) {
        userForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const userId = document.getElementById('user-id').value;
            const userData = {
                firstName: document.getElementById('user-firstName').value,
                lastName: document.getElementById('user-lastName').value,
                email: document.getElementById('user-email').value,
                phone: document.getElementById('user-phone').value,
                role: document.getElementById('user-role').value
            };

            fetch(`../api/auth/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            })
            .then(response => response.json())
            .then(data => {
                location.reload();
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        });
    }
});
