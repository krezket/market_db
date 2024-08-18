const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class Shop extends Model {};

Shop.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allownull: false,
            primarykey: true,
            autoincrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        bio: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
)
module.exports = Shop;
