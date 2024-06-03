const Schedules = require('../models/Schedules');

/**
 * Ajouter ou mettre à jour un horaire.
 *
 * @async
 * @function addOrUpdateSchedule
 * @param {Object} req - L'objet de requête HTTP.
 * @param {Object} res - L'objet de réponse HTTP.
 * @returns {Promise<void>}
 * @throws {Error} - En cas d'erreur, retourne une réponse avec un statut 500 et un message d'erreur JSON.
 */
exports.addOrUpdateSchedule = async (req, res) => {
    try {
        const weekday = req.body.weekday;

        const existingSchedule = await Schedules.findOne({ where: { weekday } });

        if (!existingSchedule) {
            const newSchedule = await Schedules.create(req.body);
            return res.status(201).json(newSchedule);
        }
        await existingSchedule.update(req.body);
        res.status(200).json(existingSchedule);
    } catch (error) {
        console.error("Error adding or updating schedule:", error);
        res.status(500).json({ error: "Error adding or updating schedule" });
    }
}

/**
 * Obtenir tous les horaires.
 *
 * @function getSchedules
 * @param {Object} req - L'objet de requête HTTP.
 * @param {Object} res - L'objet de réponse HTTP.
 * @returns {void}
 * @throws {Error} - En cas d'erreur, retourne une réponse avec un statut 500 et un message d'erreur JSON.
 */
exports.getSchedules = (req, res) => {
    Schedules.findAll()
        .then(schedules => res.status(200).json(schedules))
        .catch(error => res.status(500).json({ error }));
}
