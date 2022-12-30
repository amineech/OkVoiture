const database = require('../database/config');
const Sequelize = require('sequelize');

const Reservation = database.define('reservation', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    designation: {
        type: Sequelize.STRING,
        allowNull: false
    },
    date_debut: {
        type: Sequelize.DATE,
        allowNull: false
    },
    date_fin: {
        type: Sequelize.DATE,
        allowNull: false
    }}, {
        createdAt: false,
        updatedAt: false,
        freezeTableName: true
    });

module.exports = Reservation;