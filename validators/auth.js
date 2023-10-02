const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");



const validatorRegister = [
    check("name").exists().notEmpty().isLength({min: 3, max: 30}),
    check("age").exists().notEmpty().isNumeric(),
    check("password").exists().notEmpty().isLength({min: 3, max: 30}).isStrongPassword(),
    check("email").exists().notEmpty().isEmail(),
    (req, res, next) => {
        return validateResults(req, res, next)
    } // Llama a validateResults directamente como middleware
];

const validatorLogin = [
    check("email").exists().notEmpty().isEmail(),
    check("password").exists().notEmpty().isLength({min: 3, max: 30}).isStrongPassword(),
    (req, res, next) => {
        return validateResults(req, res, next)
    } // Llama a validateResults directamente como middleware
];

module.exports = { validatorRegister, validatorLogin};
