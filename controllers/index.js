const Service = require('../models/Service');

exports.renderIndex = async (req, res) => {
    try {
        const services = await Service.findAll();
        res.render('index.njk', {
            services: services,
            isAuthenticated: res.locals.isAuthenticated,
            isAdmin: res.locals.isAdmin
        });
    } catch (error) {
        res.status(500).json({ error });
    }
};