const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");


const validatorCreateItem = [
    check("objeto").exists().notEmpty().isLength({ min: 3, max: 80 }),
    check("cantidad").exists().notEmpty(),
    //check("tipo").exists().notEmpty().isLength({ min: 3, max: 80 }),
    check("propiedades").exists().notEmpty(),
    //check("receta").exists().notEmpty().isBoolean(),
    check("descripcion").exists().notEmpty().isLength({ min: 5, max: 200 }),
    (req, res, next) => {
        return validateResults(req, res, next)
    } // Llama a validateResults directamente como middleware
];

const validatorGetItem = [
    check("id").exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next)
    } // Llama a validateResults directamente como middleware
];

const validatorUpdateItem = [
    check("id").exists().notEmpty(),
    check("objeto").exists().notEmpty().isLength({ min: 3, max: 80 }),
    check("cantidad").exists().notEmpty(),
    check("descripcion").exists().notEmpty().isLength({ min: 5, max: 200 }),
    (req, res, next) => {
        return validateResults(req, res, next)
    } // Llama a validateResults directamente como middleware
];

module.exports = { validatorCreateItem, validatorGetItem, validatorUpdateItem};
