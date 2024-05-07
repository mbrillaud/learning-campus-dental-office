const { DataTypes } = require('sequelize');
const sequelize = require('../utils/sequelize-config');

const User = require('./User');

const News = sequelize.define('news', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: true
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  }
});

News.belongsTo(User, { foreignKey: 'id', as: 'author' });

module.exports = News;
