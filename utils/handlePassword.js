//Para encriptar el pw
const bycryptjs = require("bcryptjs")

/**
* Contraseña sin encriptar.
* @param{*} passwordPlain
*/

const encrypt = async (passwordPlain) => {
    const hash = await bycryptjs.hash(passwordPlain, 15) //encripta con un hash de 15 caracteres
    return hash
}

/**
* Pasar contraseña sin encriptar y pasar contraseña encriptada
* @param {*} passwordPlain
* @param {*} hashPassword
*/

const compare = async (passwordPlain, hashPassword) => {
    return await bycryptjs.compare(passwordPlain, hashPassword)
}

module.exports = {encrypt, compare}