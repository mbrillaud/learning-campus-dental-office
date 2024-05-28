const Appointment = require('../models/Appointment');
const Service = require('../models/Service');
const Schedules = require('../models/Schedules');
const { Op } = require('sequelize');
const moment = require('moment');

moment.locale('fr');

/**
 * Renders the appointments form with available slots and services.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Promise<void>} - The function does not return a value.
 */
exports.renderAppointmentsForm = async (req, res) => {
    try {
        const { availableSlots, services } = await getAvailableSlots(req, res); // Appel de la fonction getAvailableSlots et récupération des données
        res.render('appointment.njk', { availableSlots, services, userId: req.auth.userId }); // Passage des données au template
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching available slots.' });
    }
};

exports.addOrUpdateAppointment = async (req, res) => {
    console.log('addOrUpdateAppointment', req.body);
    try {
        if(req.params.id) {
            const appointment = await Appointment.findOne({ where: { id: req.params.id } });
            if (!appointment) {
                res.status(404).json({ error: 'Appointment not found' });
                return;
            }
            await appointment.update(req.body);
            res.status(200).json(appointment);
        } else {
            //check if appointment already exists at this date
            const existingAppointment = await Appointment.findOne({ where: { date: req.body.date } });
            if (existingAppointment) {
                res.status(400).json({ error: 'Un rendez-vous existe déjà à cette heure' });
                return;
            }
            const appointment = await Appointment.create(req.body);
            res.status(201).json({message : 'Le rendez-vous a été enregistré'});
        }
    } catch (error) {
        res.status(500).json({ error });
    }
}

/**
 * Retrieves the available slots and services for the next 7 days.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Promise<Object>} An object containing the available slots and services.
 * @throws {Error} If an error occurs while fetching the available slots.
 */
const getAvailableSlots = async (req, res) => {
    try {
        // Récupérer les horaires d'ouverture
        const schedules = await Schedules.findAll();
        const services = await Service.findAll();
        console.log('services', services);

        // Générer les plages horaires pour les 7 prochains jours
        const availableSlots = [];
        for (let i = 0; i < 7; i++) {
            const currentDate = moment().add(i, 'days');
            const weekday = currentDate.format('dddd').toLowerCase();
            const schedule = schedules.find(s => s.weekday.toLowerCase() === weekday);
            if (schedule) {
                const slots = getTimeSlotsForDay(schedule, currentDate);
                availableSlots.push(...slots);
            }
        }

        // Récupérer les rendez-vous existants pour les 7 prochains jours
        const startDate = moment().startOf('day').toDate();
        const endDate = moment().add(7, 'days').endOf('day').toDate();
        const appointments = await Appointment.findAll({
            where: {
                date: {
                    [Op.between]: [startDate, endDate]
                },
                status: {
                    [Op.ne]: 'cancelled'
                }
            }
        });

        // Filtrer les plages horaires disponibles en fonction des rendez-vous existants
        const bookedSlots = appointments.map(app => moment(app.date).format('YYYY-MM-DD HH:mm'));
        const filteredSlots = availableSlots.filter(slot => !bookedSlots.includes(slot));

        return {
            availableSlots: filteredSlots,
            services: [...services]
        };
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching available slots.' });
    }
};

const getTimeSlotsForDay = (schedule, date) => {
    const slots = [];
    if (schedule.morningopeningtime !== '00:00:00' && schedule.morningclosingtime !== '00:00:00') {
        const morningSlots = getTimeSlots(schedule.morningopeningtime, schedule.morningclosingtime, date);
        slots.push(...morningSlots);
    }
    if (schedule.afternoonopeningtime !== '00:00:00' && schedule.afternoonclosingtime !== '00:00:00') {
        const afternoonSlots = getTimeSlots(schedule.afternoonopeningtime, schedule.afternoonclosingtime, date);
        slots.push(...afternoonSlots);
    }
    return slots;
};



const getTimeSlots = (start, end, date) => {
    const slots = [];
    let currentTime = moment(date.format('YYYY-MM-DD') + ' ' + start);
    const endTime = moment(date.format('YYYY-MM-DD') + ' ' + end);

    while (currentTime < endTime) {
        const nextTime = moment(currentTime).add(30, 'minutes');
        slots.push(currentTime.format('YYYY-MM-DD HH:mm'));
        currentTime = nextTime;
    }
    return slots;
};
