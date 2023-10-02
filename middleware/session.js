const { handleHttpError } = require("../utils/handleError");
const {verifyToken} = require("../utils/handleJwt")
const {usersModel} = require("../models")
//const {User} = require("../models/mysql/users")
const getProperties = require("../utils/handlePropertiesEngine");
const propertiesKey = getProperties()

const authMiddleware =  async (req, res, next) => {
    try{
        if(!req.headers.authorization){
            handleHttpError(res, 401);
            return
        }

        const token = req.headers.authorization.split(' ').pop(); //para que recoja el authorization y elimine la parte de bearer
        const dataToken = await verifyToken(token) //le pasamos el token de sesion para que verifique

        if(!dataToken){
            handleHttpError(res, 401);
            return
        }

        const query = {
            [propertiesKey.id] : dataToken[propertiesKey.id]
        }
        /*
        //para saber quien es el usuario que consume la autorización
        const user = await usersModel.findOne(query)
        req.user = user

        next() //para que deje pasar al usuario
        */
        try {
            const user = await usersModel.findOne({ where: query }); // Añade "where" para definir el filtro de búsqueda
            if (user) {
              req.user = user;
              next(); //para que deje pasar al usuario
            } else {
              handleHttpError(res, 401); // El usuario no fue encontrado en la base de datos
            }
        } catch (error) {
            handleHttpError(res, 500);
        }
    }catch(e){
        handleHttpError(res, 500);
    }
}

module.exports = authMiddleware;