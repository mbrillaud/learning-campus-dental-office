const Schedules = require('../models/Schedules');

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

exports.getSchedules = (req, res) => {
    Schedules.findAll()
        .then(schedules =>
            res.status(200).json(schedules))
        .catch(error => res.status(500).json({ error }));
}

