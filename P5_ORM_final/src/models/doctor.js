'use strict';

const {Model} = require('sequelize');

// Definition of the Quiz model:
module.exports = (sequelize, DataTypes) => {

    class Doctor extends Model { }

    // Inicialize el modelo Doctor aqui
    Doctor.init({ 
            name: {
                type: DataTypes.STRING
            },
            surname: {
                type: DataTypes.STRING
            },
            speciality: {
                type: DataTypes.STRING
            }
        }, {sequelize});

    return Doctor;
};