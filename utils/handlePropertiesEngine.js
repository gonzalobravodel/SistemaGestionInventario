/**
 * Convierte los nombres de las propiedades 
*/
require("dotenv").config(); //para que use las variables de entorno

const ENGINE_DB = process.env.ENGINE_DB;
const ENGINE_DB_AUX = process.env.ENGINE_DB_AUX;
const getProperties = () => {
    const data = {
        nosql: {
            id: '_id'
        },
        mysql: {
            id: 'id'
        }
    }
    return data[ENGINE_DB]
}
const getPropertiesAux = () => {
    const data = {
        nosql: {
            id: '_id'
        },
        mysql: {
            id: 'id'
        }
    }
    return data[ENGINE_DB_AUX]
}
module.exports = getProperties, getPropertiesAux;