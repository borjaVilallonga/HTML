const {readFile} = require('fs/promises')

/* exports.nombreFuncion = (parametros) => {

    return visualViewport;
} */

//1.LEER UN FICHERO DE FORMA ASÍNCRONA
//Lee de forma asincrona el fichero JSON
exports.load = async filename => {
    const buf = await readFile(filename);
    return JSON.parse(buf);
}

//2.OBTENER INFROMACION SOBRE TEMPERATURAS
//Obtiene la temperatura de todas las ciudades y devuelve la temperatura mas alta 
//devuelve un numero
exports.max_temp = (cities) => {
// 0 creo una variable donde almaceno la temperatura de la primera ciudad del array
    let maxTemp = cities[0].main.temp;
// 1 cojo todos los valores de temperatura
// 2 si es mayor que todos los valores de temperatura lo actualizo 
    cities.forEach((city) => {
        let temperatura = city.main.temp;
        if (temperatura > maxTemp){
            maxTemp = temperatura;
        }
    });
    return maxTemp;
}

//Obtiene la temperatura de todas las ciudades y devuelve la temperatura mas baja
//devuelve un numero
exports.min_temp = (cities) => {
// 0 creo una variable donde almaceno la temperatura de la primera ciudad del array
let minTemp = cities[0].main.max_temp_min;
// 1 cojo todos los valores de temperatura
// 2 si es menor que el valor de temperatura lo actualizo 
    cities.forEach((city) => {
        let temperatura = city.main.max_temp_min;
        if (temperatura < minTemp){
            minTemp = temperatura;
        }
    });
    return minTemp;
}

//Obtiene la temperatura de todas las ciudades y devuelve la temperatura de la temperatura minima mas alta
//devuelve un numero
exports.max_temp_min = (cities) => {
    // 0  creo una variable donde recojo el valor de temp_min de la primera ciudad del array
    let maxMinTemp = cities[0].main.max_temp_max;
    // 1 cojo todos los valores tem_min del array
    // 2 si algun valor es es mayor que la variable inicial actualiza el valor
    cities.forEach((city) => {
        let temperaturaMin = city.main.temp_min;
        if (temperaturaMin > maxMinTemp){
            maxMinTemp = temperaturaMin;
        }
    });
    return maxMinTemp;
}

//Obtiene la temperatura de todas las ciudades y devuelve la temperatura de la temperatura maxima mas baja
//devuelve un numero 
exports.min_temp_max = (cities) => {
    // 0  creo una variable donde recojo el valor de temp_min de la primera ciudad del array
    let minMaxTemp = cities[0].main.temp_max;
    // 1 cojo todos los valores tem_min del array
    // 2 si algun valor es es mayor que la variable inicial actualiza el valor
    cities.forEach((city) => {
        let temperaturaMin = city.main.temp_max;
        if (temperatura < minMaxTemp){
            minMaxTemp = temperatura;
        }
    });
    return minMaxTemp;
}

//Obtiene la temperatura de todas las ciudades y devuelve la temperatura media
//devuelve un numero
const average_temp = exports.average_temp = (cities) => {
    // 1 Variable con el numero de ciudades
    // 2 Vatiable con el valor inicial del acumulador a 0
   let numeroDeCiudades = cities.length;
   let valorInicialAcumulador = 0;
    // 3 funcion del callback que suma todas las temperaturas de todas la ciudades
   let sumaTemperaturas = cities.reduce(
        (temperaturAcumulada, ciudad) => {
            let temperatura = ciudad.main.temp;
            return temperaturAcumulada + temperatura;
        }, valorInicialAcumulador
   );
    // 4 media 
   return sumaTemperaturas/ numeroDeCiudades;
}

//Devuelve un array con el nombre de las ciudades cuya temperatura supera la temperatura media 
//Devuelve un array
exports.warmer_average_temp = (cities) => {
    // 1 variable con la que almacenamos la temperatura media 
    let temperaturaMedia = average_temp(cities);
    // 2 Con el filter obtienes las ciudades que cuplen la condicion que su temperatura media es mayor que la temperatura media de todas
    let ciudadesMasCalientesQueMedia = cities.filter((ciudad) => {
        let temperatura = ciudad.main.temp;
        return temperatura > temperaturaMedia;
    });
    // 3 Variable array que almacena el nombre de todas las ciudades que pasan de una temperatura mayor que la media
    let nombresCiudades = ciudadesMasCalientesQueMedia.map((ciudad) => ciudad.name);
    return nombresCiudades;
}

//3.FILTRAR POR POSICION GEOGRAFICA
//Devuelve el nobre de la ciudad situada mas al norte
exports.max_north = (cities) => {
    // 1 Almacena en una variable la primera ciudad del aaray
    let ciudadMasAlNorte = cities[0];
    // 2 Obtiene la latitud de todas las ciudades
    // 3 Si es mayor que la variable ciudadMasAlNorte actualiza el valor
    cities.forEach((ciudad) => {
        let latitud = ciudad.coord.lat;
        if(latitud > ciudadMasAlNorte.coord.lat){
            ciudadMasAlNorte = ciudad;
        }
    });
    // 4 Devuelve el nombre de la ciudad mas al norte
    return ciudadMasAlNorte.name;
}

//Devuelve el nombre de la ciudad mas al sur
//Devuelve un string
exports.max_south = (cities) => {
    // 1 Almacena en una variable la primera ciudad del array
    let ciudadMasAlSur = cities[0];
    // 2 Obtiene las coordenadas de todas las ciudades
    // 3 Si es menor la latitud que la latitud de la ciudadMasAlSur actualiza el valor
    cities.forEach((cities) => {
        let latitud = ciudad.coord.lat;
        if(latitud < ciudadMasAlSur.coord.lat){
            ciudadMasAlSur = ciudad
        }
    })
    // 4 Devuelve el nombre de la ciudad mas al sur
    return ciudadMasAlSur.name;
}

//Calcula el centro de gravedad de todas las ciudades usando latitud y longitud. El centro de gravedad se calcula como la media de las latitudes y longitudes.
//Devuelve un objeto con dos propiedades, lat y lon, que contienen las coordenadas del centro de gravedad
exports.gravity_center = (cities) => {
    // 1 Crea una variable donde almacena el numero de ciudades
    let numeroDeCiudades = cities.length;
    // 2 Crea el acumulador y lo pone a 0
    let valorInicialAcumulador = 0;
    // 3 El metodo reduce suma todas las Longitudes de las ciudades a la longitudAcumulada
    let totalLon = cities.reduce(
        (longitudAcumulada, ciudad) => {
            return longitudAcumulada += ciudad.coord.lon;
        }, valorInicialAcumulador
    );
    // 4 El metodo reduce suma las latitudes de las ciudades a la latitudAcumulada
    let totalLat = cities.reduce((latitudAcumulada, ciudad) => {
        return latitudAcumulada += ciudad.coord.lat;
        }, valorInicialAcumulador);
    // 5 Media aritmetica de la lonn y lat
    let mediaLon = totalLon/numeroDeCiudades;
    let mediaLat = totalLat/numeroDeCiudades;
    // 6 Devuelve el valor del GC
    return {
        lon: mediaLon,
        lat: mediaLat
    }
}

const getDistanciaGC = (cities, ciudad) => {
    //
    let lonGC = gravity_center(cities).lon;
    let latGC = gravity_center(cities).lat;

    let lonCiudad = ciudad.coord.lon;
    let latCiudad = ciudad.coord.lat;

    let diferenciaLongitudes = lonCiudad - lonGC;
    let diferenciaLatitudes = latCiudad - latGC;

    let distanciaGC = Math.sqrt(Math.pow(diferenciaLongitudes, 2) + Math.pow(diferenciaLatitudes, 2));

    return distanciaGC;
}
//Devuelve el nombre de la ciudad mas cercana al centro de gavedad
//
exports.closest_GC = (cities) => {
    // 1 Coger el nombre de una distancia minima
    let distanciaMin = getDistanciaGC(cities, cities[0]);
    let nameCiudadDistanciaMin = "";

    cities.forEach((ciudad) => {
        let distancia = getDistanciaGC(cities, ciudad);
        if(distancia < distanciaMin){
            distanciaMin = distancia;
            nameCiudadDistanciaMin = ciudad.name;
        }
    });

    return nameCiudadDistanciaMin;
}
//Metdo que devuelve las ciudades con una condicion de temperatura
exports.citiesWarmerThanTemp = (cities, temp) => {
    // 1 Crea una variable que almacena las ciudades que tengan una temperatura mayor que temp
    let warmerCities = cities.filter(ciudad => {
        return ciudad.main.temp > temp;
    })
    // 2 Crea una variable que te devuelve el nombre y la temperaturas de la variable anterior
    let warmerCitiesNames = warmerCities.map((ciudad) => {
        return {
            name: ciudad.name,
            temp: ciudad.main.temp
        }
    })
    return warmerCitiesNames;
}

//Ciudad con mayor diferencia de temperatura entre temperatura y feeels_like

const getDiferenciaTempYFeelLike = (ciudad) => {
    return ciudad.main.temp - ciudad.main.feels_like;
}

exports.ciudadGreatestDifference = (cities) => {
    let cityGreatesDifference = cities[0];
    // 1 Crea variable que almacena la feelLike primera del array 
    let greatesDifference = getDiferenciaTempYFeelLike(cities[0]);
    // 2 Recorres el array ciudad aplicando la operacion del metodo de encima
    cities.forEach((ciudad) => {
        let currentCityDifference = getDiferenciaTempYFeelLike(ciudad);
        // 3 Cuando uno de las difencias cumple la condicion se actuliza la ciudad
        if(currentCityDifference > greatesDifference){
            greatesDifference = currentCityDifference;
            cityGreatesDifference = ciudad;
        }
    });
    // 4 Devuelve un objeto con el name, temp, feels_like, greatesDifference
    let parametrosCiudades = cities.map((ciudad) => {
        return {
            name: ciudad.name,
            temp: ciudad.main.temp,
            feels_like: ciudad.main.feels_like,
            difference: ciudad.main.temp - ciudad.main.feels_like
        }
}).sort((a, b) => b.difference -a.difference);

return {
    name: cityGreatesDifference.name,
    temp: cityGreatesDifference.main.temp,
    feels_like: cityGreatesDifference.main.feels_like,
    difference: greatesDifference
}}