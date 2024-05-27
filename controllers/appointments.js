const Appointment = require('../models/Appointment');
const Service = require('../models/Service');
const Schedules = require('../models/Schedules');
const { Op } = require('sequelize');
const moment = require('moment');

moment.locale('fr');

exports.getAvailableSlots = async (req, res) => {
    try {
        // Récupérer les horaires d'ouverture
        const schedules = await Schedules.findAll();
        const services = await Service.findAll({
            attributes: ['label']
        });

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
            services: services.map(service => service.label)
        };
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching available slots.' });
    }
};

exports.renderAppointmentsForm = async (req, res) => {
    try {
        const { availableSlots, services } = await this.getAvailableSlots(req, res); // Appel de la fonction getAvailableSlots et récupération des données
        console.log({ availableSlots, services })
        res.render('appointment.njk', { availableSlots, services, userId: req.auth.userId }); // Passage des données au template
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
