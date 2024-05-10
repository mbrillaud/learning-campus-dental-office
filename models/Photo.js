const { DataTypes } = require('sequelize');
const sequelize = require('../utils/sequelize-config');

const Photo = sequelize.define('photos', {
  url: {
    type: DataTypes.STRING,
    allowNull: false
  }
});


module.exports = Photo;
