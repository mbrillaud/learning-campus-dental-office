const Service = require('../models/Service');
const Schedules = require('../models/Schedules');
const Photo = require('../models/Photo');

/**
 * Rendu de la page d'accueil avec les services, horaires et photos.
 *
 * @async
 * @function renderIndex
 * @param {Object} req - L'objet de requête HTTP.
 * @param {Object} res - L'objet de réponse HTTP.
 * @returns {Promise<void>}
 * @throws {Error} - En cas d'erreur, retourne une réponse avec un statut 500 et un message d'erreur JSON.
 */
exports.renderIndex = async (req, res) => {
    try {
        const services = await Service.findAll();
        const schedules = await Schedules.findAll();
        const photos = await Photo.findAll();
        res.render('index.njk', {
            services: services,
            schedules: schedules,
            photos: photos,
            isAuthenticated: res.locals.isAuthenticated,
            isAdmin: res.locals.isAdmin
        });
    } catch (error) {
        res.status(500).json({ error });
    }
};
