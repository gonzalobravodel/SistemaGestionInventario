
const { validationResult } = require("express-validator");

const validateResults = (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(403).json({ errors: errors.array() });
        }
        return next(); // Continua hacia el controlador
    } catch (err) {
        // Manejo de errores si ocurre una excepción
        console.error(err);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};

module.exports = validateResults;
/*
const { validationResult } = require("express-validator");

const validateResults = (req, res, next) => {
  try {
    validationResult(req).throw();
    return next(); //TODO Continua hacia el controlador!
  } catch (err) {
    res.status(403);
    res.send({ errors: err.array() });
  }
};

module.exports = validateResults;
*/