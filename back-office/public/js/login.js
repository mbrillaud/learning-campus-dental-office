const loginForm = document.getElementById('login-form');

document.getElementById('login-form').addEventListener('submit', (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    login({email, password});
});

const login = (credentials) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
        },
        body: JSON.stringify(credentials)
    };

    const loginUrl = 'api/auth/login';

    fetch(loginUrl, requestOptions)
        .then(data => {
            const location = data.headers.get('Location');
            if (location && location === '/bo') {
                window.location.href = location;
            } else {
                document.getElementById('unauthorized').classList.remove('invisible');
            }
        })
        .catch(error => {
            console.error('Erreur lors de la requête :', error);
        });
};

