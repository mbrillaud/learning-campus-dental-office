document.getElementById('signup-form').addEventListener('submit', (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const phone = document.getElementById('phone').value;

    signup({email, password, firstName, lastName, phone});
});

const signup = (credentials) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
        },
        body: JSON.stringify(credentials)
    };

    const loginUrl = 'api/auth/signup';

    fetch(loginUrl, requestOptions)
        .then(data => {
            if(data.status === 200) {
                if(data.status === 200) {
                    window.location.href = '/';
                }
            } else {
                document.getElementById('failure').classList.remove('invisible');
            }
        })
        .catch(error => {
            document.getElementById('failure').classList.remove('invisible');
            console.error('Erreur lors de la requête :', error);
        });
};
