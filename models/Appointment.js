const { DataTypes } = require('sequelize');
const sequelize = require('../utils/sequelize-config');

const User = require('./User');
const Service = require('./Service');

const Appointment = sequelize.define('appointments', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  serviceId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('pending', 'confirmed', 'cancelled'),
    allowNull: false,
    defaultValue: 'pending'
  }
});

// Correction des associations avec les bonnes clés étrangères
Appointment.belongsTo(User, { foreignKey: 'userId', as: 'patient' });
Appointment.belongsTo(Service, { foreignKey: 'serviceId', as: 'service' });

module.exports = Appointment;
