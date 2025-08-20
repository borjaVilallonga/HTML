const {models} = require('../models');

// Crear un doctor
exports.create = async function (name, surname, speciality) {
    try{
        let doctor = models.Doctor.build({
            name,
            surname,
            speciality
        });
        doctor = await doctor.save({fields: ["name","surname","speciality"]})
        return doctor;
    } catch (error){
    }
};


// Asigna un doctor y devuelve los datos del paciente
exports.assignDoctor = async function (patientId, doctorId) {
    let patient = await models.Patient.findByPk(patientId);
    let doctor = await models.Doctor.findByPk(doctorId);

    //se debe usar el metodo .addDoctor y NO el .setDoctor() ya que set doctor
    // te actualiza el atributo doctor y no añade mas
    patient = await patient.addDoctor(doctor);
    return patient;
}

// Muestra los medicos de un paciente
exports.indexByPatient = async function (patientId) {
    let patient = await models.Patient.findByPk(patientId);
    let doctors = await patient.getDoctors();
     //otra opccion
    /* 
    let doctorsFindAll = await models.Patient.FindAll
        where: {
            id: patientId
        }
    */
    return doctors;
    
}
