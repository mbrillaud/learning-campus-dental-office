const News = require('../models/News');
const fs = require('fs');

/**
 * Ajouter une nouvelle actualité.
 *
 * @async
 * @function addNews
 * @param {Object} req - L'objet de requête HTTP.
 * @param {Object} res - L'objet de réponse HTTP.
 * @returns {Promise<void>}
 * @throws {Error} - En cas d'erreur, retourne une réponse avec un statut 400 ou 500 et un message d'erreur JSON.
 */
exports.addNews = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "Aucune image n'a été téléchargée." });
        }
        const imageUrl = req.file.path;
        req.body.userId = req.auth.userId;
        req.body.imageUrl = imageUrl;

        const news = await News.create(req.body);
        res.status(201).json(news);
    } catch (error) {
        res.status(400).json({ error });
    }
}

/**
 * Obtenir toutes les actualités.
 *
 * @async
 * @function getNews
 * @param {Object} req - L'objet de requête HTTP.
 * @param {Object} res - L'objet de réponse HTTP.
 * @returns {Promise<void>}
 * @throws {Error} - En cas d'erreur, retourne une réponse avec un statut 500 et un message d'erreur JSON.
 */
exports.getNews = async (req, res) => {
    try {
        const news = await News.findAll();
        res.status(200).json(news);
    } catch (error) {
        res.status(500).json({ error });
    }
}

/**
 * Mettre à jour une actualité par ID.
 *
 * @async
 * @function updateNews
 * @param {Object} req - L'objet de requête HTTP.
 * @param {Object} res - L'objet de réponse HTTP.
 * @returns {Promise<void>}
 * @throws {Error} - En cas d'erreur, retourne une réponse avec un statut 404 ou 500 et un message d'erreur JSON.
 */
exports.updateNews = async (req, res) => {
    try {
        const [updatedRows] = await News.update(req.body, { where: { id: req.params.id } });
        if (updatedRows === 0) {
            res.status(404).json({ error: 'News not found' });
            return;
        }
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error });
    }
}

/**
 * Supprimer une actualité par ID.
 *
 * @async
 * @function deleteNews
 * @param {Object} req - L'objet de requête HTTP.
 * @param {Object} res - L'objet de réponse HTTP.
 * @returns {Promise<void>}
 * @throws {Error} - En cas d'erreur, retourne une réponse avec un statut 404 ou 500 et un message d'erreur JSON.
 */
exports.deleteNews = async (req, res) => {
    try {
        const news = await News.findOne({ where: { id: req.params.id } });
        if (!news) {
            res.status(404).json({ error: 'News not found' });
            return;
        }
        fs.unlink(news.imageUrl, (err) => {
            if (err) {
                console.error('Error deleting file:', err);
                res.status(500).json({ error: 'Failed to delete news' });
                return;
            }
        });
        await news.destroy();
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error });
    }
}

/**
 * Rendre la page des actualités.
 *
 * @async
 * @function renderNews
 * @param {Object} req - L'objet de requête HTTP.
 * @param {Object} res - L'objet de réponse HTTP.
 * @returns {Promise<void>}
 * @throws {Error} - En cas d'erreur, retourne une réponse avec un statut 500 et un message d'erreur JSON.
 */
exports.renderNews = async (req, res) => {
    try {
        const news = await News.findAll();
        res.render('news.njk', { news: news });
    } catch (error) {
        res.status(500).json({ error });
    }
}

/**
 * Rendre la page des actualités pour le back-office.
 *
 * @async
 * @function renderNewsBO
 * @param {Object} req - L'objet de requête HTTP.
 * @param {Object} res - L'objet de réponse HTTP.
 * @returns {Promise<void>}
 * @throws {Error} - En cas d'erreur, retourne une réponse avec un statut 500 et un message d'erreur JSON.
 */
exports.renderNewsBO = async (req, res) => {
    try {
        const news = await News.findAll();
        res.render('bo/news.njk', { news: news });
    } catch (error) {
        res.status(500).json({ error });
    }
}

/**
 * Rendre une actualité unique.
 *
 * @async
 * @function renderSingleNews
 * @param {Object} req - L'objet de requête HTTP.
 * @param {Object} res - L'objet de réponse HTTP.
 * @returns {Promise<void>}
 * @throws {Error} - En cas d'erreur, retourne une réponse avec un statut 500 et un message d'erreur JSON.
 */
exports.renderSingleNews = async (req, res) => {
    try {
        const news = await News.findOne({ where: { id: req.params.id } });
        res.render('single_news.njk', { news: news });
    } catch (error) {
        res.status(500).json({ error });
    }
}
