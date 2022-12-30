const database = require('../database/config');
const Sequelize = require('sequelize');

const Car = database.define('voiture', {
    id: { 
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
     },
     prenom: {
        type: Sequelize.STRING
     },
     email: {
        type: Sequelize.STRING
     },
     designation: {
        type: Sequelize.STRING
     },
     ville: {
        type: Sequelize.STRING
     },
     prix: {
        type: Sequelize.FLOAT
     },
     photo: {
        type: Sequelize.STRING
     }}, {
        createdAt: false,
        updatedAt: false,
        freezeTableName: true
     });

module.exports = Car;