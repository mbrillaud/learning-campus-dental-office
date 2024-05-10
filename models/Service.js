const { DataTypes } = require('sequelize');
const sequelize = require('../utils/sequelize-config');

const Service = sequelize.define('services', {
  label: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  }
});

module.exports = Service;
