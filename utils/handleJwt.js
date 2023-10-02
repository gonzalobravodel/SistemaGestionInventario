const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const getProperties = require("../utils/handlePropertiesEngine");
const propertiesKey = getProperties()

/**
* Método para firmar/generar token
* Debes de pasar el objeto del usuario
* @param {*} user
*/
const tokenSign = async (user) => {
    const sign = await jwt.sign(
        {
            [propertiesKey.id]: user[propertiesKey.id],
            role: user.role
        },
        JWT_SECRET,
        {
            expiresIn:"1h"
        }
    );
    
    return sign
};

/**
* Método para verificar token 
* Debes pasar el token de session el JWT
* @param {*} tokenJwt
* @returns
*/
const verifyToken = async (tokenJwt) => {
    try{
        return jwt.verify(tokenJwt, JWT_SECRET)
    }catch(e){
        return null
    }
};

module.exports = { tokenSign, verifyToken };