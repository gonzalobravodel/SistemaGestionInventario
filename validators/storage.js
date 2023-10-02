const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");


const validatorGetItem = [
    check("_id").exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next)
    } // Llama a validateResults directamente como middleware
];



module.exports = { validatorGetItem};
