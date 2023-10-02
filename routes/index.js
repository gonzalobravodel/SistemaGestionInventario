const express = require("express");
const fs = require("fs")
const router = express.Router();

const PATH_ROUTES = __dirname; //la dirección en la máquina donde se encuentra

const removeExtension = (fileName) => {
    return fileName.split('.').shift() //devuelve el nombre del archivo sin la extension
}

fs.readdirSync(PATH_ROUTES).filter((file) => {
    const name = removeExtension(file)
    if (name !== 'index'){
        router.use(`/${name}`, require(`./${file}`)) //TODO http://localhost:2000/API/users
    }
}) //devolverá un array con los nombres de los archivos que se encuentran en routes

module.exports = router