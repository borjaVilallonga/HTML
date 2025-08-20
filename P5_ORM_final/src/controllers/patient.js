const {models} = require('../models');

// Muestra la informacion de un paciente
// crear un metodo read que da la info del paciente dando la patientId
//devuelve un objeto con la info
exports.read = async function (patientId) {
    // Rellene aqui ...
    let patient = await models.Patient.findByPk(patientId);
    return patient;
}

// Crea un paciente en un hospital
exports.create = async function (hospitalId, name, surname, dni) {
    try {
        // Creacion de instancia no persistente de Paciente
        //build genera una fila de la tabla pero sin guardarla (aun)
        let patient = models.Patient.build({
            name,
            surname,
            dni,
            hospitalId: hospitalId
        });
        // Almacenar en DB:
        // save guarda el contenido en la tabla de datos expecificando los campos de la tabla
        patient = await patient.save({fields: ["name","surname","dni","hospitalId"]});
        return patient;
    } catch (error){

    }
}

// Actualiza un paciente
exports.update = async function (patientId, name, surname, dni) {
    //con esta variable conseguimos al paciente usando el metodo findByPk que queremos actualizar
    let patient = await models.Patient.findByPk(patientId);
    //actualizacion de los valores
    patient.name = name;
    patient.surname = surname;
    patient.dni = dni;
    //almacenarlo en DB:
    try {
        await patient.save({fields: ["name","surname","dni"]});
    } catch (error) {

    }
}

// Borra un paciente
exports.delete = async function (patientId) {
    // destruye todos los patient que su id sea patientId
    try {
        await models.Patient.destroy({ where: {
            id: patientId
        }});
    } catch (error) {

    }
}


// Buscar pacientes de un hospital ordenados por el nombre (de la A a la Z)

exports.indexByHospital = async function (hospitalId) {
    //busca los pacientes que tengan hospitalId y los devuelve ordenados ascendente
    let patients = await models.Patient.findAll({
        order: [
            [ "name" ]
        ],
        where: {
            hospitalId: hospitalId
        }
    });
    return patients;
}

// Buscar pacientes de un hospital ordenados por el nombre (de la Z a la A)

exports.indexByHospital = async function (hospitalId) {
    //busca los pacientes que tengan hospitalId y los devuelve ordenados ascendente
    let patients = await models.Patient.findAll({
        order: [
            [ "name", "DESC" ]
        ],
        where: {
            hospitalId: hospitalId
        }
    });
    return patients;
}
