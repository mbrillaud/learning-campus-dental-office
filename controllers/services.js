const Service = require('../models/Service');

exports.addService = async (req, res) => {
    try {
        const service = await Service.create(req.body);
        res.status(201).json(service);
    } catch (error) {
        res.status(400).json({ error });
    }
};

exports.getServices = async (req, res) => {
    try {
        const services = await Service.findAll();
        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ error });
    }
};

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
