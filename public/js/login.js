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
            if(data.status === 200) {
                window.location.href = '/';
            } else {
                showToast('Email ou mot de passe invalide', 'error');
            }
        })
        .catch(error => {
            showToast('Erreur lors de la connexion', 'error');
            console.error('Erreur lors de la requête :', error);
        });
};