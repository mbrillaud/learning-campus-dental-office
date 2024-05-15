const News = require('../models/News');
const fs = require('fs');

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

exports.getNews = async (req, res) => {
    try {
        const news = await News.findAll();
        res.status(200).json(news);
    } catch (error) {
        res.status(500).json({ error });
    }
}

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
        })
        await news.destroy();
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error });
    }
}

exports.renderNews = async (req, res) => {
    try {
        const news = await News.findAll();
        res.render('news.njk', { news: news });
    } catch (error) {
        res.status(500).json({ error });
    }
}
exports.renderNewsBO = async (req, res) => {
    try {
        const news = await News.findAll();
        res.render('bo/news.njk', { news: news });
    } catch (error) {
        res.status(500).json({ error });
    }
}