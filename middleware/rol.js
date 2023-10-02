//Dentro se van a comprobar los roles de los usuarios para permitir las consultas o no
const { handleHttpError } = require("../utils/handleError");

/**
* Array con los roles permitidos
* @param {*} rol
* @returns 
*/

const checkRol = (roles) => (req, res, next) => {
    try{
        const {user} = req;
        const rolesByUser = user.role; //TODO ["user"]
        //TODO: ["admin", "manager"]

        const checkValueRol = roles.some((rolSingle) => rolesByUser.includes(rolSingle)); //devuelve true si el usuario tiene un rol que existe dentro de los valores del array de routes

        if (!checkValueRol){
            handleHttpError(res, 401); // No tiene permisos
            return;
        }

        next();
    }catch(e){
        console.log("Error en check rol: ", e);
        handleHttpError(res, 401); // No tiene permisos
    }
    
}

module.exports = checkRol;