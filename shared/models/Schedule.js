const { DataTypes } = require('sequelize');
const sequelize = require('../utils/sequelize-config');

const Schedule = sequelize.define('schedules', {
  weekday: {
    type: DataTypes.STRING,
    allowNull: false
  },
  openingtime: {
    type: DataTypes.TIME,
    allowNull: false
  },
  closingtime: {
    type: DataTypes.TIME,
    allowNull: false
  }
});


module.exports = Schedule;
