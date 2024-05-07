// Surcharge de la méthode fetch
const originalFetch = fetch;
fetch = function(url, options) {
    // Récupérer le token du cookie
    const token = getCookie('token');

    // Ajouter le token dans les en-têtes si disponible
    if (token) {
        options = options || {};
        options.headers = options.headers || {};
        options.headers['Authorization'] = `Bearer ${token}`;
    }

    // Appeler la méthode fetch originale avec les en-têtes modifiés
    return originalFetch(url, options);
}

// Fonction pour récupérer un cookie par son nom
function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split('=');
        if (cookieName.trim() === name) {
            return cookieValue;
        }
    }
    return null;
}
