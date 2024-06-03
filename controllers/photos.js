const Photo = require('../models/Photo');
const fs = require('fs');

/**
 * Ajouter une photo.
 *
 * @async
 * @function postPhoto
 * @param {Object} req - L'objet de requête HTTP.
 * @param {Object} res - L'objet de réponse HTTP.
 * @returns {Promise<void>}
 * @throws {Error} - En cas d'erreur, retourne une réponse avec un statut 500 et un message d'erreur JSON.
 */
exports.postPhoto = async (req, res) => {
    try {
        const photo = await Photo.create({ url: req.file.path });
        res.status(201).json(photo);
    } catch (error) {
        res.status(500).json({ error });
    }
};

/**
 * Supprimer une photo par ID.
 *
 * @async
 * @function deletePhoto
 * @param {Object} req - L'objet de requête HTTP.
 * @param {Object} res - L'objet de réponse HTTP.
 * @returns {Promise<void>}
 * @throws {Error} - En cas d'erreur, retourne une réponse avec un statut 404 ou 500 et un message d'erreur JSON.
 */
exports.deletePhoto = async (req, res) => {
    try {
        const photo = await Photo.findOne({ where: { id: req.params.id } });
        if (!photo) {
            res.status(404).json({ error: 'Photo not found' });
            return;
        }

        // Supprimer la photo du serveur
        fs.unlink(photo.url, async (err) => {
            if (err) {
                console.error('Error deleting file:', err);
                res.status(500).json({ error: 'Failed to delete photo' });
                return;
            }

            await photo.destroy();
            res.status(204).end();
        });
    } catch (error) {
        res.status(500).json({ error });
    }
};

/**
 * Rendre la page des photos.
 *
 * @async
 * @function renderPhotos
 * @param {Object} req - L'objet de requête HTTP.
 * @param {Object} res - L'objet de réponse HTTP.
 * @returns {Promise<void>}
 * @throws {Error} - En cas d'erreur, retourne une réponse avec un statut 500 et un message d'erreur JSON.
 */
exports.renderPhotos = async (req, res) => {
    try {
        const photos = await Photo.findAll();
        res.render('./bo/photos.njk', { photos: photos });
    } catch (error) {
        res.status(500).json({ error });
    }
}
