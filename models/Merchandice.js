const { model, datatypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class Merchandice extends Model {};

Merchandice.init(
    {
        id: {
            type: datatypes.integer,
            allownull: false,
            primarykey: true,
            autoincrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },

module.exports = Merchandice;

