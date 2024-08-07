const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/connection');

class Subscribers extends Model {}

Subscribers.init({
}, {
  sequelize,
  modelName: 'Subscribers'
});

module.exports = Subscribers;

