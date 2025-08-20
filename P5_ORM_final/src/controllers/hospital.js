const {models} = require('../models');

// Crear un  hospital
exports.create = async function (name, city) {
    try {
        let hospital =  models.Hospital.build({
            name,
            city
        });
        hospital = await hospital.save({fields: ["name","city"]})
        return hospital;
    } catch(error){

    }
};

// Devuelve todos los hospitales
exports.index = async function () {
    let hospitales = await models.Hospital.findAll();
    return hospitales;
}

// Filtra los hospitales por ciudad
exports.indexByCity = async function (city) {
    let hospitales = await models.Hospital.findAll({
        where: {
            city: city
        }
    });
    return hospitales;
}

