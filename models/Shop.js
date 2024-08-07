const { model, datatypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class Shop extends Model {};

Shop.init(
    {
        id: {
            type: datatypes.integer,
            // defaultvalue: datatypes.uuidv4,
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
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,   
        },
    },

    module.exports = Shop;
