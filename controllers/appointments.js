const Appointment = require('../models/Appointment');
const Service = require('../models/Service');
const Schedules = require('../models/Schedules');
const User = require('../models/User');
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

/**
 * Renders the appointments page for the back office.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Promise<void>} - The function does not return a value.
 */
exports.renderAppointmentsBO = async (req, res) => {
    try {
        const appointments = await Appointment.findAll({ include: [{ model: User }, { model: Service }] });
        res.render('bo/appointments.njk', { appointments });
    } catch (error) {
        console.log('error:', error);
        res.status(500).json({ error });
    }
};



/**
 * Adds or updates an appointment based on the provided request body.
 *
 * @param {Object} req - The request object containing the appointment data.
 * @param {Object} res - The response object.
 * @return {Promise<void>} - A promise that resolves when the appointment is added or updated successfully.
 */
/**
 * Adds or updates an appointment based on the provided request body.
 *
 * @param {Object} req - The request object containing the appointment data.
 * @param {Object} res - The response object.
 * @return {Promise<void>} - A promise that resolves when the appointment is added or updated successfully.
 */
exports.addOrUpdateAppointment = async (req, res) => {
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
            // check if appointment already exists at this date and is not cancelled
            const existingAppointment = await Appointment.findOne({
                where: {
                    date: req.body.date,
                    status: {
                        [Op.ne]: 'cancelled'
                    }
                }
            });
            if (existingAppointment) {
                res.status(400).json({ error: 'Un rendez-vous existe déjà à cette heure' });
                return;
            }
            const appointment = await Appointment.create(req.body);
            res.status(201).json({ message: 'Le rendez-vous a été enregistré' });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
};


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

        // Déterminer la demi-journée actuelle
        const currentDateTime = moment();
        const currentDay = currentDateTime.format('dddd').toLowerCase();
        const currentTime = currentDateTime.format('HH:mm:ss');

        let nextOpenDay = currentDateTime.clone().add(1, 'day'); // Par défaut, on commence à partir du lendemain
        let nextOpenTime = 'morningopeningtime'; // Par défaut, on commence le matin
        let isClosed = true;

        // Vérifier si le cabinet est ouvert pour la demi-journée actuelle
        const currentSchedule = schedules.find(s => s.weekday.toLowerCase() === currentDay);
        if (currentSchedule) {
            if ((currentTime >= currentSchedule.morningopeningtime && currentTime < currentSchedule.morningclosingtime) ||
                (currentTime >= currentSchedule.afternoonopeningtime && currentTime < currentSchedule.afternoonclosingtime)) {
                // Le cabinet est ouvert pour la demi-journée actuelle
                isClosed = false;
                nextOpenDay = currentDateTime.clone();
                if (currentTime >= currentSchedule.afternoonclosingtime || currentTime < currentSchedule.morningopeningtime) {
                    // Si nous sommes dans l'après-midi ou avant l'ouverture du matin, passer à la prochaine demi-journée
                    nextOpenDay = nextOpenDay.add(1, 'day');
                }
                if (currentTime >= currentSchedule.afternoonclosingtime || currentTime < currentSchedule.morningclosingtime) {
                    // Si nous sommes dans l'après-midi ou avant la fermeture du matin, la prochaine ouverture est l'après-midi
                    nextOpenTime = 'afternoonopeningtime';
                }
            }
        }

        // Trouver le prochain jour ouvrable si le cabinet est fermé actuellement
        if (isClosed) {
            let nextOpenSchedule = schedules.find(s => s.weekday.toLowerCase() === nextOpenDay.format('dddd').toLowerCase());
            while (!nextOpenSchedule || (nextOpenSchedule.closed && nextOpenTime === 'morningopeningtime')) {
                // Si le jour est fermé ou si c'est le matin et le jour est fermé
                nextOpenDay.add(1, 'day');
                nextOpenSchedule = schedules.find(s => s.weekday.toLowerCase() === nextOpenDay.format('dddd').toLowerCase());
            }
        }

        // Générer les plages horaires à partir de la prochaine demi-journée disponible
        const availableSlots = [];
        for (let i = 0; i < 7; i++) {
            const currentDate = nextOpenDay.clone().add(i, 'days');
            let startFromAfternoon = false; // Détermine si nous commençons à partir de l'après-midi de la journée actuelle
            if (i === 0 && nextOpenDay.isSame(currentDateTime, 'day') && nextOpenTime === 'afternoonopeningtime') {
                // Si c'est le jour actuel et que la prochaine demi-journée disponible est l'après-midi
                startFromAfternoon = true;
            }
            const weekday = currentDate.format('dddd').toLowerCase();
            const schedule = schedules.find(s => s.weekday.toLowerCase() === weekday);
            if (schedule) {
                const slots = getTimeSlotsForDay(schedule, currentDate, startFromAfternoon);
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

/**
 * Retrieves the available time slots for a specific day based on the given schedule.
 *
 * @param {Object} schedule - The schedule object containing opening and closing times for morning and afternoon.
 * @param {Date} date - The date for which the time slots are being retrieved.
 * @param {boolean} startFromAfternoon - Indicates whether the time slots should start from the afternoon or morning.
 * @return {Array} An array of available time slots for the given day.
 */
const getTimeSlotsForDay = (schedule, date, startFromAfternoon) => {
    const slots = [];
    if (schedule.morningopeningtime !== '00:00:00' && schedule.morningclosingtime !== '00:00:00') {
        if (!startFromAfternoon) {
            const morningSlots = getTimeSlots(schedule.morningopeningtime, schedule.morningclosingtime, date);
            slots.push(...morningSlots);
        }
    }
    if (schedule.afternoonopeningtime !== '00:00:00' && schedule.afternoonclosingtime !== '00:00:00') {
        if (startFromAfternoon) {
            const afternoonSlots = getTimeSlots(schedule.afternoonopeningtime, schedule.afternoonclosingtime, date);
            slots.push(...afternoonSlots);
        }
    }
    return slots;
};


/**
 * Generates an array of time slots between a given start and end time on a specific date.
 *
 * @param {string} start - The start time in the format 'HH:mm'.
 * @param {string} end - The end time in the format 'HH:mm'.
 * @param {moment.Moment} date - The date for which the time slots are generated.
 * @return {string[]} An array of time slots in the format 'YYYY-MM-DD HH:mm'.
 */
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
