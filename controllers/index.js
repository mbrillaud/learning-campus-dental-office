const Service = require('../models/Service');
const Schedules = require('../models/Schedules');
const Photo = require('../models/Photo');

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