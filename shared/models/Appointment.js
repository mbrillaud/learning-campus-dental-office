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
  status: {
    type: DataTypes.ENUM('pending', 'confirmed', 'cancelled'),
    allowNull: false,
    defaultValue: 'pending'
  }
});

Appointment.belongsTo(User, { foreignKey: 'id', as: 'patient' });
Appointment.belongsTo(Service, { foreignKey: 'id', as: 'service' });

module.exports = Appointment;
