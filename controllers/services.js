const Service = require('../models/Service');

/**
 * Ajouter un nouveau service.
 *
 * @async
 * @function addService
 * @param {Object} req - L'objet de requête HTTP.
 * @param {Object} res - L'objet de réponse HTTP.
 * @returns {Promise<void>}
 * @throws {Error} - En cas d'erreur, retourne une réponse avec un statut 400 et un message d'erreur JSON.
 */
exports.addService = async (req, res) => {
    try {
        const service = await Service.create(req.body);
        res.status(201).json(service);
    } catch (error) {
        res.status(400).json({ error });
    }
};

/**
 * Obtenir tous les services.
 *
 * @async
 * @function getServices
 * @param {Object} req - L'objet de requête HTTP.
 * @param {Object} res - L'objet de réponse HTTP.
 * @returns {Promise<void>}
 * @throws {Error} - En cas d'erreur, retourne une réponse avec un statut 500 et un message d'erreur JSON.
 */
exports.getServices = async (req, res) => {
    try {
        const services = await Service.findAll();
        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ error });
    }
};

/**
 * Mettre à jour un service par ID.
 *
 * @async
 * @function updateService
 * @param {Object} req - L'objet de requête HTTP.
 * @param {Object} res - L'objet de réponse HTTP.
 * @returns {Promise<void>}
 * @throws {Error} - En cas d'erreur, retourne une réponse avec un statut 404 ou 500 et un message d'erreur JSON.
 */
exports.updateService = async (req, res) => {
    try {
        const [updatedRows] = await Service.update(req.body, { where: { id: req.params.id } });
        if (updatedRows === 0) {
            res.status(404).json({ error: 'Service not found' });
            return;
        }
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error });
    }
};

/**
 * Supprimer un service par ID.
 *
 * @async
 * @function deleteService
 * @param {Object} req - L'objet de requête HTTP.
 * @param {Object} res - L'objet de réponse HTTP.
 * @returns {Promise<void>}
 * @throws {Error} - En cas d'erreur, retourne une réponse avec un statut 404 ou 500 et un message d'erreur JSON.
 */
exports.deleteService = async (req, res) => {
    try {
        const rowsDeleted = await Service.destroy({ where: { id: req.params.id } });
        if (rowsDeleted === 0) {
            res.status(404).json({ error: 'Service not found' });
            return;
        }
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error });
    }
};

/**
 * Rendre la page des services.
 *
 * @async
 * @function renderServices
 * @param {Object} req - L'objet de requête HTTP.
 * @param {Object} res - L'objet de réponse HTTP.
 * @returns {Promise<void>}
 * @throws {Error} - En cas d'erreur, retourne une réponse avec un statut 500 et un message d'erreur JSON.
 */
exports.renderServices = async (req, res) => {
    try {
        const services = await Service.findAll();
        res.render('services.njk', { services: services });
    } catch (error) {
        res.status(500).json({ error });
    }
};

/**
 * Rendre la page des services pour le back-office.
 *
 * @async
 * @function renderServicesBO
 * @param {Object} req - L'objet de requête HTTP.
 * @param {Object} res - L'objet de réponse HTTP.
 * @returns {Promise<void>}
 * @throws {Error} - En cas d'erreur, retourne une réponse avec un statut 500 et un message d'erreur JSON.
 */
exports.renderServicesBO = async (req, res) => {
    try {
        const services = await Service.findAll();
        res.render('bo/services.njk', { services: services });
    } catch (error) {
        res.status(500).json({ error });
    }
};
