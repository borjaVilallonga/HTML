// Carga ORM
const Sequelize = require('sequelize');

// Nombre que se le da a la base de datos(sqlite:p5.sqlite)
const url = process.env.DATABASE_URL || "sqlite:p5.sqlite";

// CREACION DB: si no usamos el logging se pondra por defecto true y añade comentarios a nuestras tablas
const sequelize = new Sequelize(url, { logging: false });    // Rellene aqui ...


// Import Models
const Doctor = require('./doctor')(sequelize, Sequelize.DataTypes);
const Hospital = require('./hospital')(sequelize, Sequelize.DataTypes);
const Patient = require('./patient')(sequelize, Sequelize.DataTypes);


// Relationships

//Relación 1-to-N entre Hospital y Paciente
Hospital.hasMany(Patient, {as: 'patient', foreignKey: 'hospitalId'});
Patient.belongsTo(Hospital, {as: 'hospital', foreignKey: 'hospitalId'});

//Relacion M-to-N entre Pciente y Doctor
Doctor.belongsToMany(Patient, {through: 'Doctor_Patients'});
Patient.belongsToMany(Doctor, {through: 'Doctor_Patients'});

module.exports = sequelize;
