/**
 * Normalise le port en un nombre entier ou en une chaîne.
 * @param {(string|number)} val - Valeur du port à normaliser.
 * @returns {(string|number|boolean)} Port normalisé.
 */
exports.normalizePort = val => {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
      return val;
    }
    if (port >= 0) {
      return port;
    }
    return false;
};
