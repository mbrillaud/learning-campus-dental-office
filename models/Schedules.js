const { DataTypes } = require('sequelize');
const sequelize = require('../utils/sequelize-config');

const Schedules = sequelize.define('schedules', {
  weekday: {
    type: DataTypes.STRING,
    allowNull: false
  },
  morningopeningtime: {
    type: DataTypes.TIME,
    allowNull: false
  },
  morningclosingtime: {
    type: DataTypes.TIME,
    allowNull: false
  },
  afternoonopeningtime: {
    type: DataTypes.TIME,
    allowNull: false
  },
  afternoonclosingtime: {
    type: DataTypes.TIME,
    allowNull: false
  }
});


module.exports = Schedules;
