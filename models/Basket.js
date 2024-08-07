const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/connection');

class Basket extends Model {}

Basket.init({
}, {
  sequelize,
  modelName: 'Basket'
});

module.exports = Basket;
